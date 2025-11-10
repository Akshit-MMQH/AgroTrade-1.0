import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import registrations from '../../data/registrations.json';

const TraderLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    traderId: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = registrations.users.find(
      user => user.type === 'trader' && 
             user.id === formData.traderId && 
             user.password === formData.password
    );

    if (user) {
      // In a real app, you would store the user session/token here
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/trader/dashboard');
    } else {
      setError('Invalid ID or password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold text-gray-900">AT</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">AgroTrade</h2>
        </div>

        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900">Trader Login</h3>
          <p className="text-gray-600 mt-2">Welcome back! Please enter your details</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Trader ID</label>
            <input
              type="text"
              name="traderId"
              value={formData.traderId}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="Enter your Trader ID"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 font-semibold py-3 rounded-lg hover:bg-yellow-500 transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-gray-600">
          <Link to="/" className="text-yellow-600 hover:text-yellow-700">
            ← Back to selection
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TraderLogin;