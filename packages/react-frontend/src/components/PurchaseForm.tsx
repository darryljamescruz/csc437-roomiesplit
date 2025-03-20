import React, { useState, ChangeEvent, FormEvent, JSX } from 'react';
import Modal from './Modal.js'; // Assumes you have a Modal component
import { PurchaseFormData, Purchase, Roommate } from '../types.js';

interface PurchaseFormProps {
  onClose: () => void;
  onAddPurchase: (purchase: Purchase) => void;
  availableRoommates: Roommate[];
}

/**
 * PurchaseForm Component
 * - Collects purchase details and allows the user to assign roommates from the available list.
 * - When the "assignees" field is clicked, a modal opens showing a list of available roommates.
 * - The user can select/deselect roommates; the selected roommates are displayed in the field.
 */
export default function PurchaseForm({ onClose, onAddPurchase, availableRoommates }: PurchaseFormProps): JSX.Element {
  // Form state: cost, name, date, etc.
  const [formData, setFormData] = useState<PurchaseFormData>({
    date: '',
    name: '',
    cost: '',
    category: '',
    person: '',
    assignees: [], // We'll store the selected roommate emails here
  });
  // Boolean to control showing the roommate selector modal
  const [showRoommateSelector, setShowRoommateSelector] = useState<boolean>(false);

  // Update form data for text inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Toggle selection for a given roommate (by email)
  const toggleRoommateSelection = (roommateEmail: string): void => {
    if (formData.assignees.includes(roommateEmail)) {
      setFormData({
        ...formData,
        assignees: formData.assignees.filter(email => email !== roommateEmail),
      });
    } else {
      setFormData({
        ...formData,
        assignees: [...formData.assignees, roommateEmail],
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const purchase: Purchase = {
      id: Date.now(), // Replace with proper ID generation as needed
      date: formData.date,
      name: formData.name,
      cost: parseFloat(formData.cost),
      category: formData.category,
      person: formData.person,
      assignees: formData.assignees,
    };
    onAddPurchase(purchase);
    onClose();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {/* Other inputs (date, name, cost, category, person) */}
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