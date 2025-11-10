import React, { useState, useEffect } from 'react';
import { TrendingUp, MapPin, Calendar } from 'lucide-react';

const MarketPredictor = () => {
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const [selectedLocation, setSelectedLocation] = useState('maharashtra');
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(false);

  const crops = [
    { value: 'wheat', label: 'Wheat' },
    { value: 'rice', label: 'Rice' },
    { value: 'corn', label: 'Corn' },
    { value: 'tomato', label: 'Tomato' },
    { value: 'onion', label: 'Onion' },
    { value: 'potato', label: 'Potato' },
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' }
  ];

  const locations = [
    { value: 'andhra-pradesh', label: 'Andhra Pradesh' },
    { value: 'arunachal-pradesh', label: 'Arunachal Pradesh' },
    { value: 'assam', label: 'Assam' },
    { value: 'bihar', label: 'Bihar' },
    { value: 'chhattisgarh', label: 'Chhattisgarh' },
    { value: 'goa', label: 'Goa' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'haryana', label: 'Haryana' },
    { value: 'himachal-pradesh', label: 'Himachal Pradesh' },
    { value: 'jharkhand', label: 'Jharkhand' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'kerala', label: 'Kerala' },
    { value: 'madhya-pradesh', label: 'Madhya Pradesh' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'manipur', label: 'Manipur' },
    { value: 'meghalaya', label: 'Meghalaya' },
    { value: 'mizoram', label: 'Mizoram' },
    { value: 'nagaland', label: 'Nagaland' },
    { value: 'odisha', label: 'Odisha' },
    { value: 'punjab', label: 'Punjab' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'sikkim', label: 'Sikkim' },
    { value: 'tamil-nadu', label: 'Tamil Nadu' },
    { value: 'telangana', label: 'Telangana' },
    { value: 'tripura', label: 'Tripura' },
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
    { value: 'uttarakhand', label: 'Uttarakhand' },
    { value: 'west-bengal', label: 'West Bengal' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'chandigarh', label: 'Chandigarh' },
    { value: 'puducherry', label: 'Puducherry' }
  ];

  const generateMockData = () => {
    const basePrice = Math.floor(Math.random() * 50) + 20;
    const data = [];
    
    for (let i = 9; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const variation = (Math.random() - 0.5) * 10;
      const price = Math.max(basePrice + variation + (Math.random() - 0.5) * 5, 5);
      
      data.push({
        date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
        price: Math.round(price * 100) / 100
      });
    }
    return data;
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setMarketData(generateMockData());
      setLoading(false);
    }, 1000);
  }, [selectedCrop, selectedLocation]);

  const maxPrice = Math.max(...marketData.map(d => d.price));
  const minPrice = Math.min(...marketData.map(d => d.price));
  const currentPrice = marketData[marketData.length - 1]?.price || 0;
  const previousPrice = marketData[marketData.length - 2]?.price || 0;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = previousPrice ? ((priceChange / previousPrice) * 100).toFixed(1) : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">Market Predictor</h3>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Crop
          </label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {crops.map(crop => (
              <option key={crop.value} value={crop.value}>{crop.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Location
          </label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {locations.map(location => (
              <option key={location.value} value={location.value}>{location.label}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {/* Price Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Current Price</p>
              <p className="text-xl font-semibold text-blue-600">₹{currentPrice}/kg</p>
              <p className={`text-sm ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {priceChange >= 0 ? '+' : ''}{priceChangePercent}% from yesterday
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">10-Day High</p>
              <p className="text-xl font-semibold text-green-600">₹{maxPrice}/kg</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">10-Day Low</p>
              <p className="text-xl font-semibold text-red-600">₹{minPrice}/kg</p>
            </div>
          </div>

          {/* Chart */}
          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-3">Price Trend (Last 10 Days)</h4>
            <div className="relative h-64 border border-gray-200 rounded-lg p-4">
              <svg className="w-full h-full">
                {marketData.map((point, index) => {
                  const x = (index / (marketData.length - 1)) * 100;
                  const y = 100 - ((point.price - minPrice) / (maxPrice - minPrice)) * 80;
                  
                  return (
                    <g key={index}>
                      {index > 0 && (
                        <line
                          x1={`${((index - 1) / (marketData.length - 1)) * 100}%`}
                          y1={`${100 - ((marketData[index - 1].price - minPrice) / (maxPrice - minPrice)) * 80}%`}
                          x2={`${x}%`}
                          y2={`${y}%`}
                          stroke="#3B82F6"
                          strokeWidth="2"
                        />
                      )}
                      <circle
                        cx={`${x}%`}
                        cy={`${y}%`}
                        r="4"
                        fill="#3B82F6"
                        className="hover:r-6 transition-all"
                      />
                    </g>
                  );
                })}
              </svg>
              
              {/* X-axis labels */}
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                {marketData.map((point, index) => (
                  <span key={index}>{point.date}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Data Table */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
            <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Daily Price History
            </h4>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold">Date</th>
                      <th className="text-center py-4 px-6 font-semibold">Price (₹/kg)</th>
                      <th className="text-center py-4 px-6 font-semibold">Daily Change</th>
                      <th className="text-center py-4 px-6 font-semibold">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {marketData.map((point, index) => {
                      const prevPrice = index > 0 ? marketData[index - 1].price : point.price;
                      const change = point.price - prevPrice;
                      const changePercent = prevPrice ? ((change / prevPrice) * 100).toFixed(1) : 0;
                      
                      return (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6">
                            <div className="font-medium text-gray-900">{point.date}</div>
                            <div className="text-sm text-gray-500">Day {index + 1}</div>
                          </td>
                          <td className="text-center py-4 px-6">
                            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                              ₹{point.price}
                            </div>
                          </td>
                          <td className="text-center py-4 px-6">
                            {index > 0 ? (
                              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                                change >= 0 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {change >= 0 ? '+' : ''}{changePercent}%
                              </div>
                            ) : (
                              <span className="text-gray-400 text-sm">-</span>
                            )}
                          </td>
                          <td className="text-center py-4 px-6">
                            {index > 0 ? (
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                change >= 0 ? 'bg-green-100' : 'bg-red-100'
                              }`}>
                                {change >= 0 ? (
                                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                  </svg>
                                ) : (
                                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MarketPredictor;