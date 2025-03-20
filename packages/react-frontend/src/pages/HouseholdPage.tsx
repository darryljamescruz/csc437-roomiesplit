import React, { JSX, useEffect, useState } from 'react';
import HouseholdForm from '../components/HouseholdForm.js';
import Modal from '../components/Modal.js';
import { useNavigate } from 'react-router-dom';
import { HouseholdFormData, HouseholdData} from '../types.js';

export default function HouseholdPage(): JSX.Element {
  const [household, setHousehold] = useState<HouseholdData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Fetch household data when the component mounts.
  useEffect(() => {
    const fetchHouseholdData = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/household', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setHousehold(data.household);
        } else {
          setError(data.message || 'Error fetching household data');
        }
      } catch (err) {
        setError('Network error');
      }
    };
    fetchHouseholdData();
  }, [token]);

  /**
   * handleHouseholdSubmit
   * Sends household data (householdName and roommates) to the backend.
   * On success, updates the household state.
   */
  const handleHouseholdSubmit = async (householdData: HouseholdFormData): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
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
        // On success, update the household state.
        setHousehold(result.household);
        // Optionally close modal or navigate to main
        setShowModal(false);
      }
    } catch (err) {
      setError('Network error.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * handleDeleteRoommate
   * Removes a roommate from the household and updates the backend.
   * Here we update the local state and then (optionally) send an API call.
   */
  const handleDeleteRoommate = async (roommateEmail: string): Promise<void> => {
    if (!household) return;
    const updatedRoommates = household.roommates.filter(rm => rm.email !== roommateEmail);
    // Optimistically update local state
    setHousehold({ ...household, roommates: updatedRoommates });

    // Optionally, send an update request to the backend:
    try {
      const res = await fetch(`http://localhost:8000/api/household/${household._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({ roommates: updatedRoommates }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Error updating household.');
      }
    } catch (err) {
      setError('Network error.');
    }
  };

  /**
   * handleDeleteHousehold
   * Deletes the entire household.
   */
  const handleDeleteHousehold = async (): Promise<void> => {
    if (!household) return;
    try {
      const res = await fetch(`http://localhost:8000/api/household/${household._id}`, {
        method: 'DELETE',
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });
      if (res.ok) {
        setHousehold(null);
        // After deletion, navigate to a different page or show a message
        navigate('/main');
      } else {
        const data = await res.json();
        setError(data.message || 'Error deleting household.');
      }
    } catch (err) {
      setError('Network error.');
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-200">Household</h1>
        <div className="flex space-x-2">
          {household && (
            <button
              onClick={handleDeleteHousehold}
              className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete Household
            </button>
          )}
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {household ? 'Edit Household' : 'Create Household'}
          </button>
        </div>
      </div>

      {error && <p className="mb-4 text-red-500">{error}</p>}

      {/* If household exists, display its data in a table */}
      {household ? (
        <div className="mb-6 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3 border border-gray-300 dark:border-gray-600">Name</th>
                <th className="px-4 py-3 border border-gray-300 dark:border-gray-600">Email</th>
                <th className="px-4 py-3 border border-gray-300 dark:border-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {household.roommates.map((rm, idx) => (
                <tr key={idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-4 py-3 border border-gray-300 dark:border-gray-600">{rm.name}</td>
                  <td className="px-4 py-3 border border-gray-300 dark:border-gray-600">{rm.email}</td>
                  <td className="px-4 py-3 border border-gray-300 dark:border-gray-600">
                    <button
                      onClick={() => handleDeleteRoommate(rm.email)}
                      className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      {/* Optionally add a trash icon here */}
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
          No household found. Please create or edit your household.
        </p>
      )}

      {/* Modal for creating/editing household */}
      <Modal
        isOpen={showModal}
        onCloseRequested={() => setShowModal(false)}
        headerLabel={household ? 'Edit Household' : 'Create Household'}
      >
        <HouseholdForm onSubmit={handleHouseholdSubmit} isLoading={isLoading} />
      </Modal>
    </div>
  );
}