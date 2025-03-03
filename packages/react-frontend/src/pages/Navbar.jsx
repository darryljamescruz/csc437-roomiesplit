import { UserCircleIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import moneyIcon from '../assets/money.svg';
import React, { useState, useEffect } from 'react';

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'FUTURE PAGES', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // toggle dark mode on root element
  useEffect(() => {
    console.log("Dark mode is now:", darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSignOut = () => {
    // Temporary sign out action with no backend action
    console.log("Signing out...");    
    navigate('/login');
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center">
          <img
            alt="Your Company"
            src={moneyIcon}
            className="h-8 w-auto"
          />
          <div className="ml-10 flex space-x-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={classNames(
                  item.current
                    ? 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white',
                  'rounded-md px-3 py-2 text-sm font-medium'
                )}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle Button */}
          <button
            onClick={() => {
              console.log("Before toggle:", darkMode);
              setDarkMode(!darkMode);
            }}
            aria-label="Toggle dark mode"
            className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {darkMode ? (
              <SunIcon className="h-6 w-6 text-yellow-400" />
            ) : (
              <MoonIcon className="h-6 w-6 text-gray-600" />
            )}
          </button>

          {/* Profile dropdown using Headless UI Menu */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center focus:outline-none">
              <UserCircleIcon className="h-8 w-8 text-gray-600 dark:text-gray-300" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleSignOut}
                    className={`${
                      active ? 'bg-gray-100 dark:bg-gray-700' : ''
                    } w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
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