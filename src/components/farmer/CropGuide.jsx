import React, { useState } from 'react';
import { BookOpen, Search, Thermometer, Droplets, Clock, DollarSign, MapPin, Sparkles, Loader2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const CropGuide = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [selectedState, setSelectedState] = useState('');
  const [aiInsights, setAiInsights] = useState(null);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const { t } = useLanguage();

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal', 'Delhi', 'Chandigarh', 'Puducherry'
  ];

  const getStateSpecificInfo = (crop, state) => {
    const stateData = {
      'Punjab': { bestSeason: 'Rabi (Oct-Mar)', avgYield: '+20%', specialTips: 'Use canal irrigation, avoid waterlogging' },
      'Maharashtra': { bestSeason: 'Kharif (Jun-Oct)', avgYield: '+15%', specialTips: 'Drip irrigation recommended, black soil advantage' },
      'Uttar Pradesh': { bestSeason: 'Rabi (Nov-Apr)', avgYield: '+10%', specialTips: 'Fertile Gangetic plains, good for wheat and rice' },
      'Karnataka': { bestSeason: 'Kharif (Jun-Sep)', avgYield: '+12%', specialTips: 'Red soil suitable, moderate rainfall region' },
      'Tamil Nadu': { bestSeason: 'Samba (Aug-Jan)', avgYield: '+8%', specialTips: 'Delta region ideal, monsoon dependent' },
      'Gujarat': { bestSeason: 'Rabi (Nov-Mar)', avgYield: '+18%', specialTips: 'Cotton belt region, good irrigation facilities' }
    };
    return stateData[state] || { bestSeason: 'Season varies', avgYield: 'Standard', specialTips: 'Follow local agricultural practices' };
  };

  const getAiInsights = async (crop, state) => {
    setLoadingInsights(true);
    setAiInsights(null);
    try {
      const prompt = `Provide specific agricultural insights for growing ${crop} in ${state}, India. Include:
      - Best planting time for this state
      - State-specific challenges
      - Local market opportunities
      - Climate considerations
      - Soil management tips
      
      Provide a JSON response with: bestTime (string), challenges (array), opportunities (array), climateNotes (string), soilTips (array)`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=AIzaSyBHaoSKwrEQib8pCmgcp3Bv3A7dtZfkt78`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const data = await response.json();

      const analysisText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!analysisText) {
        throw new Error(data?.error?.message || 'No AI content');
      }
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      const insights = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

      setAiInsights(insights);
    } catch (error) {
      console.error('AI insights failed:', error);
      setAiInsights(null);
    } finally {
      setLoadingInsights(false);
    }
  };

  const cropDatabase = [
    {
      id: 1,
      name: 'Potato',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&h=200&fit=crop',
      description: 'Versatile tuber crop that grows well in cool climates',
      climate: 'Cool, temperate regions (15-20°C)',
      soilType: 'Well-drained, loamy soil with pH 5.0-6.0',
      waterRequirement: 'Moderate (500-700mm annually)',
      growthPeriod: '90-120 days',
      yield: '20-40 tons per hectare',
      marketPrice: '₹15-25 per kg',
      benefits: ['High nutritional value', 'Multiple harvest seasons', 'Good storage life'],
      tips: ['Plant in ridges', 'Avoid waterlogging', 'Regular earthing up required']
    },
    {
      id: 2,
      name: 'Wheat',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop',
      description: 'Staple cereal crop grown in winter season',
      climate: 'Cool, dry weather (10-25°C)',
      soilType: 'Well-drained alluvial soil with pH 6.0-7.5',
      waterRequirement: 'Moderate (450-650mm)',
      growthPeriod: '120-150 days',
      yield: '25-45 quintals per hectare',
      marketPrice: '₹20-25 per kg',
      benefits: ['High demand', 'Government support', 'Multiple varieties available'],
      tips: ['Sow in November-December', 'Use certified seeds', 'Apply balanced fertilizers']
    },
    {
      id: 3,
      name: 'Rice',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop',
      description: 'Primary food crop requiring flooded conditions',
      climate: 'Warm, humid climate (20-35°C)',
      soilType: 'Clay or clay loam with good water retention',
      waterRequirement: 'High (1200-2500mm)',
      growthPeriod: '95-120 days',
      yield: '40-60 quintals per hectare',
      marketPrice: '₹18-22 per kg',
      benefits: ['Staple food crop', 'High yield potential', 'Multiple cropping possible'],
      tips: ['Maintain water level', 'Transplant at right time', 'Control weeds effectively']
    },
    {
      id: 4,
      name: 'Tomato',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&h=200&fit=crop',
      description: 'High-value vegetable crop with year-round demand',
      climate: 'Warm climate (18-27°C)',
      soilType: 'Well-drained sandy loam with pH 6.0-7.0',
      waterRequirement: 'Regular irrigation (600-800mm)',
      growthPeriod: '75-90 days',
      yield: '40-80 tons per hectare',
      marketPrice: '₹20-40 per kg',
      benefits: ['High market value', 'Quick returns', 'Processing opportunities'],
      tips: ['Use drip irrigation', 'Stake plants properly', 'Regular pruning needed']
    },
    {
      id: 5,
      name: 'Onion',
      image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=300&h=200&fit=crop',
      description: 'Essential vegetable with good storage and export potential',
      climate: 'Cool, dry climate (13-24°C)',
      soilType: 'Well-drained sandy loam with pH 6.0-7.5',
      waterRequirement: 'Moderate (350-550mm)',
      growthPeriod: '90-120 days',
      yield: '25-40 tons per hectare',
      marketPrice: '₹15-30 per kg',
      benefits: ['Good storage life', 'Export potential', 'Multiple varieties'],
      tips: ['Avoid excess nitrogen', 'Proper curing important', 'Control thrips and diseases']
    },
    {
      id: 6,
      name: 'Corn',
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=300&h=200&fit=crop',
      description: 'Versatile cereal crop used for food, feed, and industry',
      climate: 'Warm climate (21-27°C)',
      soilType: 'Well-drained fertile soil with pH 5.8-6.8',
      waterRequirement: 'Moderate to high (500-800mm)',
      growthPeriod: '80-120 days',
      yield: '25-50 quintals per hectare',
      marketPrice: '₹16-20 per kg',
      benefits: ['Multiple uses', 'Good fodder value', 'Industrial demand'],
      tips: ['Plant after soil temperature reaches 10°C', 'Ensure good drainage', 'Side dress with nitrogen']
    }
  ];

  const filteredCrops = cropDatabase.filter(crop =>
    crop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-5 h-5 text-orange-600" />
        <h3 className="text-lg font-semibold text-gray-800">{t('cropGuide')}</h3>
      </div>

      {/* Search and State Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={t('search') + ' for crops...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <MapPin className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
          >
            <option value="">{t('selectState')}</option>
            {states.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>
      </div>

      {selectedCrop ? (
        /* Detailed Crop View */
        <div className="space-y-6">
          <button
            onClick={() => setSelectedCrop(null)}
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            ← {t('backToDashboard').replace('Dashboard', 'Crop List')}
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <img
                src={selectedCrop.image}
                alt={selectedCrop.name}
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedCrop.name}</h2>
                <p className="text-gray-600">{selectedCrop.description}</p>
                {selectedState && (
                  <div className="mt-3 p-3 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">For {selectedState}:</h4>
                    <div className="text-sm text-orange-700">
                      <p><strong>Best Season:</strong> {getStateSpecificInfo(selectedCrop.name, selectedState).bestSeason}</p>
                      <p><strong>Expected Yield:</strong> {getStateSpecificInfo(selectedCrop.name, selectedState).avgYield}</p>
                      <p><strong>State Tip:</strong> {getStateSpecificInfo(selectedCrop.name, selectedState).specialTips}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Thermometer className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Climate</span>
                  </div>
                  <p className="text-sm text-gray-600">{selectedCrop.climate}</p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Droplets className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">Water Need</span>
                  </div>
                  <p className="text-sm text-gray-600">{selectedCrop.waterRequirement}</p>
                </div>

                <div className="bg-yellow-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm font-medium text-gray-700">Growth Period</span>
                  </div>
                  <p className="text-sm text-gray-600">{selectedCrop.growthPeriod}</p>
                </div>

                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-gray-700">Market Price</span>
                  </div>
                  <p className="text-sm text-gray-600">{selectedCrop.marketPrice}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">Soil Requirements</h4>
              <p className="text-sm text-gray-600 mb-2">{selectedCrop.soilType}</p>
              <p className="text-sm text-gray-600"><strong>Expected Yield:</strong> {selectedCrop.yield}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">Key Benefits</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {selectedCrop.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
              <h4 className="font-semibold text-gray-800 mb-3">Growing Tips</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {selectedCrop.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Insights Section */}
            {selectedState && (
              <div className="md:col-span-2">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      AI Insights for {selectedState}
                    </h4>
                    <button
                      onClick={() => getAiInsights(selectedCrop.name, selectedState)}
                      disabled={loadingInsights}
                      className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 disabled:opacity-50 flex items-center gap-1"
                    >
                      {loadingInsights ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          {t('loading')}
                        </>
                      ) : (
                        'Get AI Insights'
                      )}
                    </button>
                  </div>

                  {aiInsights && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Best Planting Time:</h5>
                        <p className="text-gray-600 mb-3">{aiInsights.bestTime}</p>

                        <h5 className="font-medium text-gray-700 mb-2">Climate Notes:</h5>
                        <p className="text-gray-600">{aiInsights.climateNotes}</p>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Challenges:</h5>
                        <ul className="text-gray-600 mb-3 space-y-1">
                          {aiInsights.challenges?.map((challenge, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-red-500 mt-1">•</span>
                              <span>{challenge}</span>
                            </li>
                          ))}
                        </ul>

                        <h5 className="font-medium text-gray-700 mb-2">Opportunities:</h5>
                        <ul className="text-gray-600 space-y-1">
                          {aiInsights.opportunities?.map((opportunity, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-green-500 mt-1">•</span>
                              <span>{opportunity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Crop Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCrops.map((crop) => (
            <div
              key={crop.id}
              onClick={() => {
                setSelectedCrop(crop);
                setAiInsights(null);
              }}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <img
                src={crop.image}
                alt={crop.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold text-gray-800 mb-2">{crop.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{crop.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{crop.growthPeriod}</span>
                  <span>{crop.marketPrice}</span>
                </div>
                {selectedState && (
                  <div className="mt-2 p-2 bg-orange-50 rounded text-xs text-orange-700">
                    <strong>For {selectedState}:</strong> {getStateSpecificInfo(crop.name, selectedState).bestSeason}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredCrops.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <p className="text-gray-500">No crops found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default CropGuide;
