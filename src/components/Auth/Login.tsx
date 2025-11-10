import React from 'react';
import { Link } from 'react-router-dom';
import farmerIcon from '../../assets/icons/Untitled_design__2_-removebg-preview.svg';
import traderIcon from '../../assets/icons/trader-removebg-preview.svg';

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full bg-white relative text-gray-800">
      {/* Circuit Board - Light Pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
            radial-gradient(circle at 20px 20px, rgba(55, 65, 81, 0.12) 2px, transparent 2px),
            radial-gradient(circle at 40px 40px, rgba(55, 65, 81, 0.12) 2px, transparent 2px)
          `,
          backgroundSize: '40px 40px, 40px 40px, 40px 40px, 40px 40px',
        }}
      />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="absolute top-4 right-4">
          <Link 
          to="/register"
          className="bg-yellow-400 text-gray-900 font-semibold px-6 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
        >
          Register
        </Link>
      </div>

      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="w-16 h-16 bg-yellow-400 rounded-lg flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">AT</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900">AgroTrade</h1>
      </div>
      
      <div className="flex gap-8">
        <Link 
          to="/farmer/login"
          className="w-80 h-[360px] bg-white rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all p-8 flex flex-col items-center cursor-pointer border border-gray-200"
        >
          <div className="w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
            <img src={farmerIcon} alt="Farmer" className="w-24 h-24" style={{ objectFit: 'contain' }} />
          </div>
          <h2 className="text-3xl font-semibold text-gray-900 text-center">Login as Farmer</h2>
          <div className="flex-grow" />
          <p className="text-gray-600 text-center">Access your farming dashboard and manage your produce</p>
        </Link>

        <Link 
          to="/trader/login"
          className="w-80 h-[360px] bg-white rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all p-8 flex flex-col items-center cursor-pointer border border-gray-200"
        >
          <div className="w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
            <img src={traderIcon} alt="Trader" className="w-24 h-24" style={{ objectFit: 'contain' }} />
          </div>
          <h2 className="text-3xl font-semibold text-gray-900 text-center">Login as Trader</h2>
          <div className="flex-grow" />
          <p className="text-gray-600 text-center">Access your trading platform and connect with farmers</p>
        </Link>
      </div>
      </div>
    </div>
  );
};

export default LoginPage;
