import React from 'react';
import { Zap, Camera, TrendingUp, Sprout, BookOpen, Mic, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const QuickActions = ({ onFeatureSelect }) => {
  const { t } = useLanguage();
  const features = [
    {
      id: 'disease-predictor',
      title: t('diseasePredictor'),
      description: t('diseaseDetection'),
      icon: Camera,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'market-predictor',
      title: t('marketPredictor'),
      description: t('marketTrends'),
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'crop-recommendation',
      title: t('cropRecommendation'),
      description: t('aiRecommendations'),
      icon: Sprout,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'crop-guide',
      title: t('cropGuide'),
      description: t('cropGuideDesc'),
      icon: BookOpen,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 'voice-vision-assistant',
      title: t('voiceVisionAssistant'),
      description: t('voiceVisionDesc'),
      icon: Mic,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">{t('quickActions')}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {features.map((feature) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={feature.id}
              onClick={() => onFeatureSelect(feature.id)}
              className="p-6 rounded-lg border-2 border-gray-200 hover:border-gray-300 cursor-pointer transition-all hover:shadow-md"
            >
              <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                <IconComponent className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
              <div className="flex items-center text-sm text-blue-600 font-medium">
                {t('openFeature')}
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;