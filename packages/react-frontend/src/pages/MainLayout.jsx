//  src/pages/MainLayout.jsx 
//  **Layout component for the main pages of the application. Will Reintroduce**
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function MainLayout() {
    return (
        <>
          <Navbar />
          <div className="p-4 bg-white dark:bg-gray-800" >
            <Outlet />
          </div>
        </>
      );
}