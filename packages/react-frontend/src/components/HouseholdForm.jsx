import React, { useState } from 'react';

/**
 * HouseholdForm Component
 * Renders a form to create a household by naming it and adding roommates.
 *
 * Props:
 * - onSubmit: function called with household data when the form is submitted.
 */
export default function HouseholdForm({ onSubmit }) {
  // State for household name and roommate inputs.
  const [householdName, setHouseholdName] = useState('');
  const [roommateName, setRoommateName] = useState('');
  const [roommateEmail, setRoommateEmail] = useState('');
  const [roommates, setRoommates] = useState([]);

  // Function to add a roommate to the roommates array.
  const addRoommate = () => {
    if (roommateName.trim() && roommateEmail.trim()) {
      setRoommates([...roommates, { name: roommateName.trim(), email: roommateEmail.trim() }]);
      setRoommateName('');
      setRoommateEmail('');
    }
  };

  // Handle form submission.
  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a household object with the household name and the list of roommates.
    const householdData = {
      householdName,
      roommates,
    };
    // Call the parent-provided onSubmit function with the data.
    onSubmit(householdData);
    // Optionally reset form state after submission.
    setHouseholdName('');
    setRoommates([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Household Name Input */}
      <div>
        <label
          htmlFor="householdName"
          className="block text-sm font-medium text-gray-900 dark:text-gray-200"
        >
          Household Name
        </label>
        <input
          type="text"
          id="householdName"
          required
          value={householdName}
          onChange={(e) => setHouseholdName(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 
                     focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        />
      </div>

      {/* Add Roommate Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-2">Add Roommate</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Roommate Name */}
          <div>
            <label
              htmlFor="roommateName"
              className="block text-sm font-medium text-gray-900 dark:text-gray-200"
            >
              Name
            </label>
            <input
              type="text"
              id="roommateName"
              value={roommateName}
              onChange={(e) => setRoommateName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 
                         focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
          </div>
          {/* Roommate Email */}
          <div>
            <label
              htmlFor="roommateEmail"
              className="block text-sm font-medium text-gray-900 dark:text-gray-200"
            >
              Email
            </label>
            <input
              type="email"
              id="roommateEmail"
              value={roommateEmail}
              onChange={(e) => setRoommateEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 
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
        className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Save Household
      </button>
    </form>
  );
}