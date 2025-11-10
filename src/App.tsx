import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import FarmerDashboard from './components/farmer/FarmerDashboard.jsx';
import TraderDashboard from './components/trader/TraderDashboard.jsx';
import Login from './components/Auth/Login';
import RegisterPage from './components/Auth/Register';
import FarmerLogin from './components/Auth/FarmerLogin';
import TraderLogin from './components/Auth/TraderLogin';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<Navigate to="/login" replace />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<RegisterPage />} />
          <Route path="/farmer/login" element={<FarmerLogin />} />
          <Route path="/trader/login" element={<TraderLogin />} />
          <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
          <Route path="/trader/dashboard" element={<TraderDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
