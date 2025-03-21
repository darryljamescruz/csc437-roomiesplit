import { UserCircleIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';
import { NavLink, useNavigate } from "react-router-dom";
import moneyIcon from '../assets/money.svg';
import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const navigate = useNavigate();

  // On initial render, load dark mode setting from localStorage.
  useEffect(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      const prefersDark = JSON.parse(stored);
      setDarkMode(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  // When darkMode state changes, update the HTML class.
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Toggle dark mode and call the backend endpoint to update the user's preference.
  const handleToggleDarkMode = async () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/api/preferences', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({ darkModeEnabled: newDarkMode }),
      });
      if (!res.ok) {
        console.error('Error updating dark mode preference');
      }
    } catch (error) {
      console.error('Network error updating dark mode:', error);
    }
  };

  // Sign out: clear the token and navigate to login.
  const handleSignOut = () => {
    localStorage.removeItem('token');
    console.log("Token cleared. Signing out...");
    navigate('/login');
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center">
          <img alt="Money Icon" src={moneyIcon} className="h-8 w-auto" />
          <div className="ml-10 flex space-x-4">
            <NavLink
              key="Dashboard"
              to="/main"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white rounded-md px-3 py-2 text-sm font-medium"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              key="Household"
              to="/household"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white rounded-md px-3 py-2 text-sm font-medium"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              }
            >
              Household
            </NavLink>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle Button */}
          <button
            onClick={handleToggleDarkMode}
            aria-label="Toggle dark mode"
            className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {darkMode ? (
              <SunIcon className="h-6 w-6 text-yellow-400" />
            ) : (
              <MoonIcon className="h-6 w-6 text-gray-600" />
            )}
          </button>

          {/* Profile Dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center focus:outline-none">
              <UserCircleIcon className="h-8 w-8 text-gray-600 dark:text-gray-300" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleSignOut}
                    className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''} w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </nav>
  );
}