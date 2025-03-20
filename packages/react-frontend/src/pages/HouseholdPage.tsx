import React from 'react';
import HouseholdForm from '../components/HouseholdForm.js'; // Adjust the path as needed

/**
 * HouseholdPage Component
 * Renders a page for creating a household.
 * It displays a title and includes the HouseholdForm component.
 * The Navbar remains at the top if this page is rendered inside a shared layout.
 */
export default function HouseholdPage() {
  // This function would be replaced with your backend call later.
  //TODO: FIX
  const handleHouseholdSubmit = (householdData: { name: string; email: string }) => {
    console.log("Household Created:", householdData);
    // For now, simply log the household info.
    // Later, you can send this data to your backend and navigate accordingly.
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-6">
        Household
      </h1>
      {/* Render the HouseholdForm and pass the onSubmit callback */}
      <HouseholdForm onSubmit={handleHouseholdSubmit} />
    </div>
  );
}