import React, { useState } from 'react';
import { Camera, Upload, Loader2, AlertTriangle, CheckCircle } from 'lucide-react';

const DiseasePredictor = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
      setAnalysis(null);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    try {
      const base64Image = await convertToBase64(selectedImage);
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              {
                text: "Analyze this crop image for plant diseases. Provide a JSON response with: diseaseDetected (boolean), confidence (number 0-100), diseaseName (string or null), symptoms (array of strings), recommendations (array of strings), severity (Low/Moderate/High or null). Focus on common crop diseases."
              },
              {
                inline_data: {
                  mime_type: selectedImage.type,
                  data: base64Image.split(',')[1]
                }
              }
            ]
          }]
        })
      });

      const data = await response.json();
      const analysisText = data.candidates[0].content.parts[0].text;
      
      // Extract JSON from response
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : {
        diseaseDetected: false,
        confidence: 0,
        diseaseName: null,
        symptoms: [],
        recommendations: ['Unable to analyze image'],
        severity: null
      };
      
      setAnalysis(analysis);
    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysis({
        diseaseDetected: false,
        confidence: 0,
        diseaseName: null,
        symptoms: [],
        recommendations: ['Analysis failed. Please try again.'],
        severity: null
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Camera className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-800">Disease Predictor</h3>
      </div>

      <div className="space-y-4">
        {/* Upload Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          {imagePreview ? (
            <div className="space-y-4">
              <img 
                src={imagePreview} 
                alt="Crop preview" 
                className="max-w-full h-48 object-cover mx-auto rounded-lg"
              />
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setImagePreview(null);
                  setAnalysis(null);
                }}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Change Image
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-12 h-12 text-gray-400 mx-auto" />
              <div>
                <label htmlFor="image-upload" className="cursor-pointer">
                  <span className="text-green-600 hover:text-green-700 font-medium">
                    Click to upload
                  </span>
                  <span className="text-gray-500"> or drag and drop</span>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
            </div>
          )}
        </div>

        {/* Analyze Button */}
        {selectedImage && (
          <button
            onClick={analyzeImage}
            disabled={isAnalyzing}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze for Diseases'
            )}
          </button>
        )}

        {/* Analysis Results */}
        {analysis && (
          <div className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              {analysis.diseaseDetected ? (
                <AlertTriangle className="w-5 h-5 text-orange-500" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
              <h4 className="font-medium">
                {analysis.diseaseDetected ? 'Disease Detected' : 'No Disease Detected'}
              </h4>
              <span className="text-sm text-gray-500">
                ({analysis.confidence}% confidence)
              </span>
            </div>

            {analysis.diseaseDetected && analysis.diseaseName && (
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-700">{analysis.diseaseName}</p>
                  <p className="text-sm text-gray-600">Severity: {analysis.severity}</p>
                </div>

                <div>
                  <h5 className="font-medium text-gray-700 mb-1">Symptoms:</h5>
                  <ul className="text-sm text-gray-600 list-disc list-inside">
                    {analysis.symptoms.map((symptom, index) => (
                      <li key={index}>{symptom}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium text-gray-700 mb-1">Recommendations:</h5>
                  <ul className="text-sm text-gray-600 list-disc list-inside">
                    {analysis.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseasePredictor;