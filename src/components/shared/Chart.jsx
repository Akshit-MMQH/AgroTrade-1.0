import React from 'react';

const Chart = ({ data, title }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
      <div className="flex items-end justify-between gap-4 h-64">
        {data.map((item, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '100%' }}>
              <div
                className="absolute bottom-0 w-full bg-yellow-400 rounded-t-lg transition-all hover:bg-yellow-500"
                style={{ height: `${(item.value / maxValue) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-600 font-medium">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart;