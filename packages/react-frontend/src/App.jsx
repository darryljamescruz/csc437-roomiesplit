import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import MainLayout from './pages/MainLayout';
import MainPage from './pages/MainPage';


function App() {
    return (
      <Router>
        <Routes>
          {/* Public Route: Login */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected Layout: Navbar and Main Page */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<MainPage />} />
            {/* Future pages can be nested here */}
          </Route>
        </Routes>
      </Router>
    );
  }
  

export default App;