import React, { useState } from 'react';
import { Home, Search, TrendingUp, Wallet, Package, Star } from 'lucide-react';
import Sidebar from '../shared/Sidebar';
import Navbar from '../shared/Navbar';


import CropBidding from './CropBidding';
import MarketPredictor from '../farmer/MarketPredictor';

const TraderDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const sidebarItems = [
    { icon: Home, label: 'Dashboard', active: activeTab === 'dashboard', onClick: () => setActiveTab('dashboard') },
    { icon: Search, label: 'Market Predictor', active: activeTab === 'market-predictor', onClick: () => setActiveTab('market-predictor') },
  ];





  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar role="trader" items={sidebarItems} />
      
      <div className="ml-64">
        <Navbar />
        
        <main className="p-8">
          {activeTab === 'dashboard' && (
            <div className="mb-6">
              <CropBidding />
            </div>
          )}
          {activeTab === 'market-predictor' && (
            <MarketPredictor />
          )}
        </main>
      </div>
    </div>
  );
};

export default TraderDashboard;