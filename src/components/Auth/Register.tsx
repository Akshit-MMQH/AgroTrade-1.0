import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const RegisterPage = () => {
  const [userType, setUserType] = useState('farmer');
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    kycDocuments: null,
    aadhaarCard: null,
    apmcLicense: null,
    tradingLicense: null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files?.[0] : value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold text-gray-900">AT</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">AgroTrade</h2>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Create an Account</h3>
        
        <div className="mb-8">
          <label className="block text-gray-700 mb-3 font-medium">Register as:</label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setUserType('farmer')}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                userType === 'farmer'
                  ? 'bg-yellow-400 text-gray-900'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Farmer
            </button>
            <button
              type="button"
              onClick={() => setUserType('trader')}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                userType === 'trader'
                  ? 'bg-yellow-400 text-gray-900'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Trader
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Aadhaar Card</label>
            <input
              type="text"
              name="aadhaarCard"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-yellow-400 file:text-gray-900 file:font-medium hover:file:bg-yellow-500"
              required
            />
          </div>

          {userType === 'farmer' ? (
            <div>
              <label className="block text-gray-700 mb-2 font-medium">APMC License</label>
              <input
                type="text"
                name="apmcLicense"
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-yellow-400 file:text-gray-900 file:font-medium hover:file:bg-yellow-500"
                required
              />
            </div>
          ) : (
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Trading License</label>
              <input
                type="text"
                name="tradingLicense"
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-yellow-400 file:text-gray-900 file:font-medium hover:file:bg-yellow-500"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 font-semibold py-3 rounded-lg hover:bg-yellow-500 transition-colors mt-8"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/" className="text-yellow-600 hover:text-yellow-700 font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;