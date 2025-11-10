import React from 'react';
import { Sprout, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ role, items }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Clear auth data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // Navigate to login page
    navigate('/login');
  };

  return (
  <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
    {/* Logo */}
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
          <Sprout className="w-6 h-6 text-gray-900" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">AgroTrade</h1>
          <p className="text-xs text-gray-500 capitalize">{role}</p>
        </div>
      </div>
    </div>

    {/* Navigation */}
    <nav className="flex-1 p-4 overflow-y-auto">
      {items.map((item, idx) => (
        <button
          key={idx}
          onClick={item.onClick}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 border transition-colors ${
            item.active
              ? 'bg-yellow-400 text-gray-900 border-yellow-500'
              : 'text-gray-600 hover:bg-gray-100 border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="w-5 flex justify-center">
            <item.icon className="w-5 h-5" />
          </div>
          <span className="font-medium truncate">{item.label}</span>
        </button>
      ))}
    </nav>

    {/* Bottom actions */}
    <div className="p-4 border-t border-gray-200">
      <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 mb-2 border border-gray-200 hover:border-gray-300">
        <div className="w-5 flex justify-center">
          <Settings className="w-5 h-5" />
        </div>
        <span className="font-medium truncate">Settings</span>
      </button>
      <button 
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 border border-gray-200 hover:border-red-200"
      >
        <div className="w-5 flex justify-center">
          <LogOut className="w-5 h-5" />
        </div>
        <span className="font-medium truncate">Logout</span>
      </button>
    </div>
  </div>
  );
};

export default Sidebar;