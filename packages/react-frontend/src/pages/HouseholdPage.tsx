import React, { JSX, useEffect, useState } from 'react';
import HouseholdForm from '../components/HouseholdForm.js';
import { useNavigate } from 'react-router-dom';
import { HouseholdFormData } from '../types.js';


/**
 * HouseholdPage Component
 * Renders a page for creating a household.
 * It displays a title and includes the HouseholdForm component.
 * The Navbar remains at the top if this page is rendered inside a shared layout.
 */
export default function HouseholdPage(): JSX.Element {
  // State for the current user's full name.
  const [userFullName, setUserFullName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  console.log('Token for GET /api/household:', token);

  // Fetch the current user's data (fullName) when the component mounts.
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:8000/api/household', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (res.ok) {
          setUserFullName(data.fullName);
        } else {
          setError(data.message || 'Error fetching user data');
        }
      } catch (err) {
        setError('Network error');
      }
    };

    fetchUserData();
  }, []);

  /**
   * handleHouseholdSubmit
   * Sends household data (including householdName and roommates) to the backend.
   * On success, navigates to the main page.
   */
  const handleHouseholdSubmit = async (householdData: HouseholdFormData): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8000/api/household', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify(householdData),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.message || 'Error creating household.');
      } else {
        // On success, navigate to the main dashboard (or another route).
        navigate('/main');
      }
    } catch (err) {
      setError('Network error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-6">Create Household</h1>
      {userFullName && (
        <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
          Welcome, {userFullName}! Please create your household below.
        </p>
      )}
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <HouseholdForm onSubmit={handleHouseholdSubmit} isLoading={isLoading} />
    </div>
  );
}