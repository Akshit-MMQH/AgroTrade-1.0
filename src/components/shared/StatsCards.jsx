import React from 'react';

const StatsCards = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {stats.map((stat, idx) => (
      <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
        <p className="text-gray-500 text-sm mb-2">{stat.label}</p>
        <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
        <p className="text-xs text-gray-400">{stat.change}</p>
      </div>
    ))}
  </div>
);

export default StatsCards;