// src/components/shared/Navbar.jsx
import React from "react";
import { Bell, User, Wallet } from "lucide-react";
import useWallet from "../../hooks/useWallet"; // <- note: two levels up from shared
import LanguageToggle from './LanguageToggle';

const Navbar = () => {
  const { wallet, connect } = useWallet();

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
      <div className="flex items-center gap-4">
        <LanguageToggle />
        
        <button className="p-2 hover:bg-gray-100 rounded-lg relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {wallet.accounts.length > 0 ? (
          <div className="px-4 py-2 bg-green-500 rounded-lg text-white">
            {wallet.accounts[0].slice(0, 6)}...{wallet.accounts[0].slice(-4)}
          </div>
        ) : (
          <button
            onClick={connect}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-400 rounded-lg hover:bg-yellow-500 transition-colors"
          >
            <Wallet className="w-4 h-4" />
            <span className="font-medium">Connect Wallet</span>
          </button>
        )}

        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <User className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
