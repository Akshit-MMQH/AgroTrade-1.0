import React, { useState } from 'react';
import { Sprout, MapPin, Cloud, TestTube, Loader2, DollarSign, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    location: '',
    weatherConditions: '',
    soilHealth: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const { t } = useLanguage();

  const locations = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal', 'Delhi', 'Chandigarh', 'Puducherry'
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getRecommendations = async () => {
    setIsAnalyzing(true);
    
    try {
      const prompt = `Based on the following agricultural information, recommend the top 3 most suitable crops:
      
      Location: ${formData.location}
      Weather Conditions: ${formData.weatherConditions}
      Soil Health: ${formData.soilHealth}
      
      Provide a JSON response with an array of 3 crop recommendations, each containing:
      - cropName (string)
      - suitabilityScore (number 1-100)
      - expectedYield (string with units)
      - estimatedProfit (string with currency)
      - growthPeriod (string)
      - keyBenefits (array of 2-3 short strings)
      - requirements (array of 2-3 short strings)
      
      Keep benefits and requirements concise and practical.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const data = await response.json();
      const analysisText = data.candidates[0].content.parts[0].text;
      
      const jsonMatch = analysisText.match(/\[[\s\S]*\]/);
      const recommendations = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
      
      setRecommendations(recommendations);
    } catch (error) {
      console.error('Analysis failed:', error);
      setRecommendations([]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== '');

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <Sprout className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-800">{t('cropRecommendation')}</h3>
      </div>

      <div className="space-y-6">
        {/* Simplified Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Location
            </label>
            <select
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="">{t('selectState')}</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Cloud className="w-4 h-4 inline mr-1" />
              Weather Conditions
            </label>
            <textarea
              name="weatherConditions"
              value={formData.weatherConditions}
              onChange={handleInputChange}
              placeholder="Describe your local weather (e.g., hot and dry, monsoon season, mild winter, etc.)"
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <TestTube className="w-4 h-4 inline mr-1" />
              Soil Health
            </label>
            <textarea
              name="soilHealth"
              value={formData.soilHealth}
              onChange={handleInputChange}
              placeholder="Describe your soil condition (e.g., fertile black soil, sandy soil, clay soil, well-drained, etc.)"
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Get Recommendations Button */}
        <button
          onClick={getRecommendations}
          disabled={!isFormValid || isAnalyzing}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {t('loading')}
            </>
          ) : (
            t('getRecommendations')
          )}
        </button>

        {/* Recommendations */}
        {recommendations && (
          <div className="space-y-6">
            <h4 className="font-semibold text-gray-800 text-center">Recommended Crops for Your Farm</h4>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {recommendations.map((crop, index) => (
                <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="text-center mb-4">
                    <h5 className="font-bold text-xl text-gray-800 mb-2">{crop.cropName}</h5>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold inline-block">
                      {crop.suitabilityScore}% Match
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="bg-white p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-medium text-gray-600">Yield</span>
                      </div>
                      <p className="font-semibold text-blue-600">{crop.expectedYield}</p>
                    </div>

                    <div className="bg-white p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="text-xs font-medium text-gray-600">Profit</span>
                      </div>
                      <p className="font-semibold text-green-600">{crop.estimatedProfit}</p>
                    </div>

                    <div className="bg-white p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-gray-600">Duration</span>
                      </div>
                      <p className="font-semibold text-gray-800">{crop.growthPeriod}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h6 className="font-semibold text-gray-700 mb-2 text-sm">Benefits:</h6>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {crop.keyBenefits?.slice(0, 3).map((benefit, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-green-500 mt-1">•</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h6 className="font-semibold text-gray-700 mb-2 text-sm">Needs:</h6>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {crop.requirements?.slice(0, 3).map((req, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropRecommendation;