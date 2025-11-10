import React, { useState, useRef } from 'react';
import { Mic, Camera, Upload, Loader2, Play, Pause, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const VoiceVisionAssistant = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [textQuestion, setTextQuestion] = useState('');
  
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const { t } = useLanguage();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  };

  const analyzeVoiceAndImage = async () => {
    if (!audioBlob && !selectedImage && !textQuestion.trim()) return;
    
    setIsAnalyzing(true);
    
    try {
      let prompt = "You are an agricultural expert. Analyze the provided content and give helpful farming advice. ";
      const parts = [];
      
      // Add text question if provided
      if (textQuestion.trim()) {
        prompt += `The farmer has asked: "${textQuestion}". `;
      }

      if (audioBlob && selectedImage) {
        prompt += "I have provided both an audio recording (which may be in Hindi or English) and an image. Please analyze both and provide comprehensive agricultural guidance.";
      } else if (audioBlob) {
        prompt += "I have provided an audio recording (which may be in Hindi or English). Please transcribe and analyze it to provide agricultural advice.";
      } else if (selectedImage) {
        prompt += "I have provided an image. Please analyze it and provide agricultural guidance.";
      } else if (textQuestion.trim()) {
        prompt += "Please answer the farmer's question with detailed agricultural advice.";
      }

      prompt += " Provide response in JSON format with: transcription (string or null), imageAnalysis (string or null), suggestions (array of strings), actionItems (array of strings).";

      if (selectedImage) {
        const base64Image = await convertToBase64(selectedImage);
        parts.push({
          inline_data: {
            mime_type: selectedImage.type,
            data: base64Image.split(',')[1]
          }
        });
      }

      if (audioBlob) {
        const base64Audio = await convertToBase64(audioBlob);
        parts.push({
          inline_data: {
            mime_type: 'audio/wav',
            data: base64Audio.split(',')[1]
          }
        });
      }

      parts.push({ text: prompt });

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts }]
        })
      });

      const data = await response.json();
      const analysisText = data.candidates[0].content.parts[0].text;
      
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      const result = jsonMatch ? JSON.parse(jsonMatch[0]) : {
        transcription: null,
        imageAnalysis: null,
        suggestions: ['Unable to analyze content'],
        actionItems: ['Please try again']
      };
      
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysis({
        transcription: null,
        imageAnalysis: null,
        suggestions: ['Analysis failed. Please try again.'],
        actionItems: ['Check your internet connection']
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const playAudio = () => {
    if (audioBlob && audioRef.current) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      setIsPlaying(true);
      
      audioRef.current.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
    }
  };

  const clearAll = () => {
    setAudioBlob(null);
    setSelectedImage(null);
    setImagePreview(null);
    setAnalysis(null);
    setIsPlaying(false);
    setTextQuestion('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="flex items-center gap-1">
          <Mic className="w-5 h-5 text-purple-600" />
          <Camera className="w-5 h-5 text-purple-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{t('voiceVisionAssistant')}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Voice Recording */}
        <div className="border-2 border-dashed border-purple-300 rounded-lg p-6">
          <h4 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
            <Mic className="w-4 h-4" />
            {t('voiceRecording')}
          </h4>
          
          {audioBlob ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={playAudio}
                  disabled={isPlaying}
                  className="flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 disabled:opacity-50"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? t('playing') : t('playRecording')}
                </button>
                <button
                  onClick={() => setAudioBlob(null)}
                  className="p-2 text-gray-500 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <audio ref={audioRef} className="hidden" />
            </div>
          ) : (
            <div className="text-center">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`flex items-center gap-2 mx-auto px-4 py-3 rounded-lg font-medium transition-colors ${
                  isRecording 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                <Mic className="w-4 h-4" />
                {isRecording ? t('stopRecording') : t('startRecording')}
              </button>
              {isRecording && (
                <div className="mt-3 flex items-center justify-center gap-2 text-red-600">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                  {t('recording')}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Image Upload */}
        <div className="border-2 border-dashed border-purple-300 rounded-lg p-6">
          <h4 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
            <Camera className="w-4 h-4" />
            {t('uploadImage')}
          </h4>
          
          {imagePreview ? (
            <div className="space-y-3">
              <img 
                src={imagePreview} 
                alt="Uploaded" 
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setImagePreview(null);
                }}
                className="text-sm text-gray-500 hover:text-red-500"
              >
                {t('removeImage')}
              </button>
            </div>
          ) : (
            <div className="text-center">
              <label htmlFor="voice-image-upload" className="cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="text-purple-600 hover:text-purple-700 font-medium">
                    {t('clickToUpload')}
                  </span>
                </div>
              </label>
              <input
                id="voice-image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          )}
        </div>
      </div>

      {/* Text Question Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('askQuestion')}
        </label>
        <textarea
          value={textQuestion}
          onChange={(e) => setTextQuestion(e.target.value)}
          placeholder={t('questionPlaceholder')}
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Analyze Button */}
      {(audioBlob || selectedImage || textQuestion.trim()) && (
        <div className="mb-6">
          <button
            onClick={analyzeVoiceAndImage}
            disabled={isAnalyzing}
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t('loading')}
              </>
            ) : (
              audioBlob && selectedImage ? t('analyzeVoiceImage') :
              audioBlob ? t('analyzeVoice') :
              selectedImage ? t('analyzeImage') :
              t('getAnswer')
            )}
          </button>
        </div>
      )}

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-800">{t('aiAnalysisResults')}</h4>
            <button
              onClick={clearAll}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              {t('clearAll')}
            </button>
          </div>

          {analysis.transcription && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-medium text-blue-800 mb-2">{t('voiceTranscription')}</h5>
              <p className="text-blue-700 text-sm">{analysis.transcription}</p>
            </div>
          )}

          {textQuestion && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-800 mb-2">{t('yourQuestion')}</h5>
              <p className="text-gray-700 text-sm">{textQuestion}</p>
            </div>
          )}

          {analysis.imageAnalysis && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-medium text-green-800 mb-2">{t('imageAnalysis')}</h5>
              <p className="text-green-700 text-sm">{analysis.imageAnalysis}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h5 className="font-medium text-purple-800 mb-2">{t('suggestions')}</h5>
              <ul className="text-purple-700 text-sm space-y-1">
                {analysis.suggestions?.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <h5 className="font-medium text-orange-800 mb-2">{t('actionItems')}</h5>
              <ul className="text-orange-700 text-sm space-y-1">
                {analysis.actionItems?.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceVisionAssistant;