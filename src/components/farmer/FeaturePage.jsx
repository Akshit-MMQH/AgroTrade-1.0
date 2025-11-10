import React from 'react';
import { ArrowLeft } from 'lucide-react';
import DiseasePredictor from './DiseasePredictor';
import MarketPredictor from './MarketPredictor';
import CropRecommendation from './CropRecommendation';
import CropGuide from './CropGuide';
import VoiceVisionAssistant from './VoiceVisionAssistant';
import { useLanguage } from '../../contexts/LanguageContext';

const FeaturePage = ({ feature, onBack }) => {
  const { t } = useLanguage();
  const getFeatureComponent = () => {
    switch (feature) {
      case 'disease-predictor':
        return <DiseasePredictor />;
      case 'market-predictor':
        return <MarketPredictor />;
      case 'crop-recommendation':
        return <CropRecommendation />;
      case 'crop-guide':
        return <CropGuide />;
      case 'voice-vision-assistant':
        return <VoiceVisionAssistant />;
      default:
        return <div>Feature not found</div>;
    }
  };

  const getFeatureTitle = () => {
    switch (feature) {
      case 'disease-predictor':
        return t('diseasePredictor');
      case 'market-predictor':
        return t('marketPredictor');
      case 'crop-recommendation':
        return t('cropRecommendation');
      case 'crop-guide':
        return t('cropGuide');
      case 'voice-vision-assistant':
        return 'Voice + Vision Assistant';
      default:
        return 'Feature';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                {t('backToDashboard')}
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-semibold text-gray-800">{getFeatureTitle()}</h1>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {getFeatureComponent()}
      </div>
    </div>
  );
};

export default FeaturePage;