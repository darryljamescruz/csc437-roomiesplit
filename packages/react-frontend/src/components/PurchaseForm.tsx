import React, { useState, ChangeEvent, FormEvent, JSX } from 'react';
import Modal from './Modal.js';
import { PurchaseFormData, Purchase, Roommate } from '../types.js';

interface PurchaseFormProps {
  onClose: () => void;
  onAddPurchase: (purchase: Purchase) => void;
  availableRoommates: Roommate[];
}

/**
 * PurchaseForm Component
 * - Collects purchase details and allows the user to assign roommates.
 * - When submitted, it sends purchase data to the parent component.
 * - Also supports selecting roommates via a modal.
 */
export default function PurchaseForm({ onClose, onAddPurchase, availableRoommates }: PurchaseFormProps): JSX.Element {
  const [formData, setFormData] = useState<PurchaseFormData>({
    date: '',
    name: '',
    cost: '',
    category: '',
    person: '',
    assignees: [],
  });
  const [showRoommateSelector, setShowRoommateSelector] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleRoommateSelection = (roommateEmail: string): void => {
    if (formData.assignees.includes(roommateEmail)) {
      setFormData({ ...formData, assignees: formData.assignees.filter(email => email !== roommateEmail) });
    } else {
      setFormData({ ...formData, assignees: [...formData.assignees, roommateEmail] });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    // Construct purchase object to be sent to backend
    const purchase: Purchase = {
      id: Date.now(), // Temporary ID generation; backend will likely generate its own.
      date: formData.date,
      name: formData.name,
      cost: parseFloat(formData.cost),
      category: formData.category,
      person: formData.person,
      assignees: formData.assignees,
    };

    // Send purchase to backend
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8000/api/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify(purchase),
      });
      const data = await res.json();
      if (!res.ok) {
        // Optionally handle errors
        console.error('Error creating purchase:', data.message);
      } else {
        onAddPurchase(data.purchase); // Use the returned purchase from backend
        onClose();
      }
    } catch (error) {
      console.error('Network error creating purchase:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {/* Date Input */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-900 dark:text-gray-200">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm 
                       placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 
                       dark:border-gray-600 dark:text-gray-200"
          />
        </div>
        {/* Name of Purchase Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-gray-200">
            Name of Purchase
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm 
                       placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 
                       dark:border-gray-600 dark:text-gray-200"
          />
        </div>
        {/* Cost Input */}
        <div>
          <label htmlFor="cost" className="block text-sm font-medium text-gray-900 dark:text-gray-200">
            Cost
          </label>
          <input
            type="number"
            step="0.01"
            id="cost"
            name="cost"
            required
            value={formData.cost}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm 
                       placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 
                       dark:border-gray-600 dark:text-gray-200"
          />
        </div>
        {/* Category Input */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-900 dark:text-gray-200">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm 
                       placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 
                       dark:border-gray-600 dark:text-gray-200"
          />
        </div>
        {/* Purchaser Input */}
        <div>
          <label htmlFor="person" className="block text-sm font-medium text-gray-900 dark:text-gray-200">
            Purchaser
          </label>
          <input
            type="text"
            id="person"
            name="person"
            required
            value={formData.person}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm 
                       placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 
                       dark:border-gray-600 dark:text-gray-200"
          />
        </div>
        {/* Assignees Field */}
        <div>
          <label htmlFor="assignees" className="block text-sm font-medium text-gray-900 dark:text-gray-200">
            Assignees
          </label>
          <input
            type="text"
            id="assignees"
            name="assignees"
            readOnly
            value={formData.assignees.join(', ')}
            onClick={() => setShowRoommateSelector(true)}
            placeholder="Click to select roommates"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm 
                       placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 
                       dark:border-gray-600 dark:text-gray-200 cursor-pointer"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white 
                     shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add Purchase
        </button>
      </form>

      {/* Roommate Selector Modal */}
      {showRoommateSelector && (
        <Modal
          isOpen={showRoommateSelector}
          onCloseRequested={() => setShowRoommateSelector(false)}
          headerLabel="Select Roommates"
        >
          <div className="space-y-4">
            {availableRoommates.map((rm, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`roommate-${index}`}
                  checked={formData.assignees.includes(rm.email)}
                  onChange={() => toggleRoommateSelection(rm.email)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor={`roommate-${index}`} className="ml-2 block text-sm text-gray-900 dark:text-gray-200">
                  {rm.name} ({rm.email})
                </label>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </>
  );
}