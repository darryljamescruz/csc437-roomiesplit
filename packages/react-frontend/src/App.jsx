import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MainLayout from './pages/MainLayout';
import MainPage from './pages/Dashboard';
import HouseholdPage from './pages/HouseholdPage';

import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<MainLayout />}>
          <Route path="main" element={<MainPage />} />
          <Route path="household" element={<HouseholdPage />} />
          {/* Additional protected routes can go here */}
        </Route>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;