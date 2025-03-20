import React, { useState, ChangeEvent, FormEvent, JSX } from 'react';
import { HouseholdFormData, Roommate } from '../types.js';


/**
 * Props for HouseholdForm Component
 * - onSubmit: Callback invoked with household data when the form is submitted.
 * - isLoading: (Optional) Boolean indicating if a submission is in progress.
 */
interface HouseholdFormProps {
  onSubmit: (data: HouseholdFormData) => void;
  isLoading?: boolean;
}

export default function HouseholdForm({ onSubmit, isLoading = false }: HouseholdFormProps): JSX.Element {
  const [householdName, setHouseholdName] = useState<string>('');
  const [roommateName, setRoommateName] = useState<string>('');
  const [roommateEmail, setRoommateEmail] = useState<string>('');
  const [roommates, setRoommates] = useState<Roommate[]>([]);

  // Function to add a roommate if both name and email are provided.
  const addRoommate = (): void => {
    if (roommateName.trim() && roommateEmail.trim()) {
      setRoommates([...roommates, { name: roommateName.trim(), email: roommateEmail.trim() }]);
      setRoommateName('');
      setRoommateEmail('');
    }
  };

  // Handle form submission.
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const householdData: HouseholdFormData = {
      householdName,
      roommates,
    };
    onSubmit(householdData);
    // Optionally reset the form state after submission.
    setHouseholdName('');
    setRoommates([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Household Name Input */}
      <div>
        <label htmlFor="householdName" className="block text-sm font-medium text-gray-900 dark:text-gray-200">
          Household Name
        </label>
        <input
          type="text"
          id="householdName"
          required
          value={householdName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setHouseholdName(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 
                     focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        />
      </div>

      {/* Add Roommate Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-2">Add Roommate</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Roommate Name */}
          <div>
            <label htmlFor="roommateName" className="block text-sm font-medium text-gray-900 dark:text-gray-200">
              Name
            </label>
            <input
              type="text"
              id="roommateName"
              value={roommateName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setRoommateName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 
                         focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
          </div>
          {/* Roommate Email */}
          <div>
            <label htmlFor="roommateEmail" className="block text-sm font-medium text-gray-900 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              id="roommateEmail"
              value={roommateEmail}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setRoommateEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 
                         focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={addRoommate}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add Roommate
        </button>
      </div>

      {/* Display Roommate List if there are any */}
      {roommates.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-2">Roommates</h2>
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
                <tr>
                  <th className="px-4 py-3 border border-gray-300 dark:border-gray-600">Name</th>
                  <th className="px-4 py-3 border border-gray-300 dark:border-gray-600">Email</th>
                </tr>
              </thead>
              <tbody>
                {roommates.map((rm, idx) => (
                  <tr key={idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-4 py-3 border border-gray-300 dark:border-gray-600">{rm.name}</td>
                    <td className="px-4 py-3 border border-gray-300 dark:border-gray-600">{rm.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isLoading ? 'Saving...' : 'Save Household'}
      </button>
    </form>
  );
}