import { UserCircleIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect } from 'react';

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'FUTURE PAGES', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    // Dark mode state
    const [darkMode, setDarkMode] = useState(false);

    // toggle dark mode on root element
    useEffect(() => {
        console.log("Dark mode is now:", darkMode);
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <nav className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
            <div className="flex items-center">
              <img
                alt="Your Company"
                src="https://place-hold.it/300"
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
                } }
                aria-label="Toggle dark mode"
                className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {darkMode ? (
                  <SunIcon className="h-6 w-6 text-yellow-400" />
                ) : (
                  <MoonIcon className="h-6 w-6 text-gray-600" />
                )}
              </button>
              {/* Default Profile Icon */}
              <UserCircleIcon className="h-8 w-8 text-gray-600 dark:text-gray-300" />
            </div>
          </div>
        </nav>
      );
    }