//  src/pages/MainLayout.jsx 
//  **Layout component for the main pages of the application.**
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function MainLayout() {
    return (
        <>
          <Navbar />
          <div className="p-4">
            <Outlet />
          </div>
        </>
      );
}