import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login.js';
import SignUp from './pages/auth/SignUp.js';
import MainLayout from './pages/MainLayout.js';
import MainPage from './pages/Dashboard.js';
import HouseholdPage from './pages/HouseholdPage.js';
import RequireAuth from './components/RequireAuth.js';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth><MainLayout /></RequireAuth>}>
          <Route path="main" element={<MainPage />} />
          <Route path="household" element={<HouseholdPage />} />
        </Route>

        {/* Default Route */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}