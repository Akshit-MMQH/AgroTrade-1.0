import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    myCrops: 'My Crops',
    myAuctions: 'My Auctions',
    deliveryProgress: 'Delivery Progress',
    earnings: 'Earnings',
    ratings: 'Ratings',
    
    // Quick Actions
    quickActions: 'Quick Actions',
    diseasePredictor: 'Disease Predictor',
    marketPredictor: 'Market Predictor',
    cropRecommendation: 'Crop Recommendation',
    cropGuide: 'Crop Guide',
    
    // Common
    backToDashboard: 'Back to Dashboard',
    loading: 'Loading...',
    analyze: 'Analyze',
    search: 'Search',
    selectState: 'Select your state',
    getRecommendations: 'Get Crop Recommendations',
    
    // Voice Vision Assistant
    voiceVisionAssistant: 'Voice + Vision Assistant',
    voiceRecording: 'Voice Recording (Hindi/English)',
    uploadImage: 'Upload Image',
    startRecording: 'Start Recording',
    stopRecording: 'Stop Recording',
    recording: 'Recording...',
    playRecording: 'Play Recording',
    playing: 'Playing...',
    clickToUpload: 'Click to upload image',
    removeImage: 'Remove Image',
    askQuestion: 'Ask a specific question (optional):',
    questionPlaceholder: 'e.g., What fertilizer should I use for wheat? When is the best time to plant tomatoes?',
    analyzeVoiceImage: 'Analyze Voice & Image',
    analyzeVoice: 'Analyze Voice',
    analyzeImage: 'Analyze Image',
    getAnswer: 'Get Answer',
    aiAnalysisResults: 'AI Analysis Results',
    clearAll: 'Clear All',
    voiceTranscription: 'Voice Transcription:',
    yourQuestion: 'Your Question:',
    imageAnalysis: 'Image Analysis:',
    suggestions: 'Suggestions:',
    actionItems: 'Action Items:',
    
    // Add Crop
    addNewCropForAuction: 'Add New Crop for Auction',
    cropName: 'Crop Name',
    quantity: 'Quantity (kg)',
    minimumPrice: 'Minimum Price (₹/kg)',
    location: 'Location',
    startAuction: 'Start Auction',
    
    // Quick Actions descriptions
    diseaseDetection: 'AI-powered crop disease detection',
    marketTrends: 'View market price trends and forecasts',
    aiRecommendations: 'Get AI recommendations based on conditions',
    cropGuideDesc: 'Complete guide for different crops',
    voiceVisionDesc: 'AI assistant with voice and image analysis',
    openFeature: 'Open Feature',
    noAuctions: 'No Auctions'
  },
  hi: {
    // Navigation
    dashboard: 'डैशबोर्ड',
    myCrops: 'मेरी फसलें',
    myAuctions: 'मेरी नीलामी',
    deliveryProgress: 'डिलीवरी प्रगति',
    earnings: 'कमाई',
    ratings: 'रेटिंग',
    
    // Quick Actions
    quickActions: 'त्वरित कार्य',
    diseasePredictor: 'रोग पूर्वानुमान',
    marketPredictor: 'बाजार पूर्वानुमान',
    cropRecommendation: 'फसल सुझाव',
    cropGuide: 'फसल गाइड',
    
    // Common
    backToDashboard: 'डैशबोर्ड पर वापस',
    loading: 'लोड हो रहा है...',
    analyze: 'विश्लेषण करें',
    search: 'खोजें',
    selectState: 'अपना राज्य चुनें',
    getRecommendations: 'फसल सुझाव प्राप्त करें',
    
    // Voice Vision Assistant
    voiceVisionAssistant: 'आवाज + दृष्टि सहायक',
    voiceRecording: 'आवाज रिकॉर्डिंग (हिंदी/अंग्रेजी)',
    uploadImage: 'छवि अपलोड करें',
    startRecording: 'रिकॉर्डिंग शुरू करें',
    stopRecording: 'रिकॉर्डिंग बंद करें',
    recording: 'रिकॉर्डिंग...',
    playRecording: 'रिकॉर्डिंग चलाएं',
    playing: 'चल रहा है...',
    clickToUpload: 'छवि अपलोड करने के लिए क्लिक करें',
    removeImage: 'छवि हटाएं',
    askQuestion: 'कोई विशिष्ट प्रश्न पूछें (वैकल्पिक):',
    questionPlaceholder: 'जैसे, गेहूं के लिए कौन सा उर्वरक उपयोग करना चाहिए? टमाटर लगाने का सबसे अच्छा समय कब है?',
    analyzeVoiceImage: 'आवाज और छवि का विश्लेषण करें',
    analyzeVoice: 'आवाज का विश्लेषण करें',
    analyzeImage: 'छवि का विश्लेषण करें',
    getAnswer: 'उत्तर प्राप्त करें',
    aiAnalysisResults: 'AI विश्लेषण परिणाम',
    clearAll: 'सभी साफ़ करें',
    voiceTranscription: 'आवाज प्रतिलेखन:',
    yourQuestion: 'आपका प्रश्न:',
    imageAnalysis: 'छवि विश्लेषण:',
    suggestions: 'सुझाव:',
    actionItems: 'कार्य आइटम:',
    
    // Add Crop
    addNewCropForAuction: 'नीलामी के लिए नई फसल जोड़ें',
    cropName: 'फसल का नाम',
    quantity: 'मात्रा (किलो)',
    minimumPrice: 'न्यूनतम मूल्य (₹/किलो)',
    location: 'स्थान',
    startAuction: 'नीलामी शुरू करें',
    
    // Quick Actions descriptions
    diseaseDetection: 'AI-संचालित फसल रोग पहचान',
    marketTrends: 'बाजार मूल्य रुझान और पूर्वानुमान देखें',
    aiRecommendations: 'परिस्थितियों के आधार पर AI सुझाव प्राप्त करें',
    cropGuideDesc: 'विभिन्न फसलों के लिए पूर्ण गाइड',
    voiceVisionDesc: 'आवाज और छवि विश्लेषण के साथ AI सहायक',
    openFeature: 'फीचर खोलें',
    noAuctions: 'कोई नीलामी नहीं'
  },
  pa: {
    // Navigation
    dashboard: 'ਡੈਸ਼ਬੋਰਡ',
    myCrops: 'ਮੇਰੀਆਂ ਫਸਲਾਂ',
    myAuctions: 'ਮੇਰੀ ਨੀਲਾਮੀ',
    deliveryProgress: 'ਡਿਲੀਵਰੀ ਪ੍ਰਗਤੀ',
    earnings: 'ਕਮਾਈ',
    ratings: 'ਰੇਟਿੰਗ',
    
    // Quick Actions
    quickActions: 'ਤੁਰੰਤ ਕਾਰਵਾਈਆਂ',
    diseasePredictor: 'ਬਿਮਾਰੀ ਪੂਰਵ-ਅਨੁਮਾਨ',
    marketPredictor: 'ਮਾਰਕੀਟ ਪੂਰਵ-ਅਨੁਮਾਨ',
    cropRecommendation: 'ਫਸਲ ਸਿਫਾਰਸ਼',
    cropGuide: 'ਫਸਲ ਗਾਈਡ',
    
    // Common
    backToDashboard: 'ਡੈਸ਼ਬੋਰਡ ਤੇ ਵਾਪਸ',
    loading: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
    analyze: 'ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ',
    search: 'ਖੋਜੋ',
    selectState: 'ਆਪਣਾ ਰਾਜ ਚੁਣੋ',
    getRecommendations: 'ਫਸਲ ਸਿਫਾਰਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰੋ',
    
    // Voice Vision Assistant
    voiceVisionAssistant: 'ਆਵਾਜ਼ + ਦ੍ਰਿਸ਼ਟੀ ਸਹਾਇਕ',
    voiceRecording: 'ਆਵਾਜ਼ ਰਿਕਾਰਡਿੰਗ (ਪੰਜਾਬੀ/ਅੰਗਰੇਜ਼ੀ)',
    uploadImage: 'ਚਿੱਤਰ ਅਪਲੋਡ ਕਰੋ',
    startRecording: 'ਰਿਕਾਰਡਿੰਗ ਸ਼ੁਰੂ ਕਰੋ',
    stopRecording: 'ਰਿਕਾਰਡਿੰਗ ਬੰਦ ਕਰੋ',
    recording: 'ਰਿਕਾਰਡਿੰਗ...',
    playRecording: 'ਰਿਕਾਰਡਿੰਗ ਚਲਾਓ',
    playing: 'ਚੱਲ ਰਿਹਾ ਹੈ...',
    clickToUpload: 'ਚਿੱਤਰ ਅਪਲੋਡ ਕਰਨ ਲਈ ਕਲਿੱਕ ਕਰੋ',
    removeImage: 'ਚਿੱਤਰ ਹਟਾਓ',
    askQuestion: 'ਕੋਈ ਖਾਸ ਸਵਾਲ ਪੁੱਛੋ (ਵਿਕਲਪਿਕ):',
    questionPlaceholder: 'ਜਿਵੇਂ, ਕਣਕ ਲਈ ਕਿਹੜੀ ਖਾਦ ਵਰਤਣੀ ਚਾਹੀਦੀ ਹੈ? ਟਮਾਟਰ ਲਗਾਉਣ ਦਾ ਸਭ ਤੋਂ ਵਧੀਆ ਸਮਾਂ ਕਦੋਂ ਹੈ?',
    analyzeVoiceImage: 'ਆਵਾਜ਼ ਅਤੇ ਚਿੱਤਰ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ',
    analyzeVoice: 'ਆਵਾਜ਼ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ',
    analyzeImage: 'ਚਿੱਤਰ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ',
    getAnswer: 'ਜਵਾਬ ਪ੍ਰਾਪਤ ਕਰੋ',
    aiAnalysisResults: 'AI ਵਿਸ਼ਲੇਸ਼ਣ ਨਤੀਜੇ',
    clearAll: 'ਸਭ ਸਾਫ਼ ਕਰੋ',
    voiceTranscription: 'ਆਵਾਜ਼ ਪ੍ਰਤਿਲਿਪੀ:',
    yourQuestion: 'ਤੁਹਾਡਾ ਸਵਾਲ:',
    imageAnalysis: 'ਚਿੱਤਰ ਵਿਸ਼ਲੇਸ਼ਣ:',
    suggestions: 'ਸੁਝਾਅ:',
    actionItems: 'ਕਾਰਵਾਈ ਆਈਟਮਾਂ:',
    
    // Add Crop
    addNewCropForAuction: 'ਨੀਲਾਮੀ ਲਈ ਨਵੀਂ ਫਸਲ ਸ਼ਾਮਲ ਕਰੋ',
    cropName: 'ਫਸਲ ਦਾ ਨਾਮ',
    quantity: 'ਮਾਤਰਾ (ਕਿਲੋ)',
    minimumPrice: 'ਘੱਟੋ-ਘੱਟ ਕੀਮਤ (₹/ਕਿਲੋ)',
    location: 'ਸਥਾਨ',
    startAuction: 'ਨੀਲਾਮੀ ਸ਼ੁਰੂ ਕਰੋ',
    
    // Quick Actions descriptions
    diseaseDetection: 'AI-ਸੰਚਾਲਿਤ ਫਸਲ ਬਿਮਾਰੀ ਪਛਾਣ',
    marketTrends: 'ਮਾਰਕੀਟ ਕੀਮਤ ਰੁਝਾਨ ਅਤੇ ਪੂਰਵ-ਅਨੁਮਾਨ ਦੇਖੋ',
    aiRecommendations: 'ਹਾਲਾਤਾਂ ਦੇ ਆਧਾਰ ਤੇ AI ਸਿਫਾਰਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰੋ',
    cropGuideDesc: 'ਵੱਖ-ਵੱਖ ਫਸਲਾਂ ਲਈ ਪੂਰਾ ਗਾਈਡ',
    voiceVisionDesc: 'ਆਵਾਜ਼ ਅਤੇ ਚਿੱਤਰ ਵਿਸ਼ਲੇਸ਼ਣ ਦੇ ਨਾਲ AI ਸਹਾਇਕ',
    openFeature: 'ਫੀਚਰ ਖੋਲ੍ਹੋ',
    noAuctions: 'ਕੋਈ ਨੀਲਾਮੀ ਨਹੀਂ'
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const t = (key) => {
    return translations[currentLanguage][key] || key;
  };

  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};