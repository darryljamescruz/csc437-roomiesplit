//  src/pages/MainLayout.jsx 
//  **Layout component for the main pages of the application. Will Reintroduce**
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.js';

export default function MainLayout() {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow p-4 bg-white text-black dark:bg-gray-800 dark:text-white">
          <Outlet />
        </div>
      </div>
    );
  
}