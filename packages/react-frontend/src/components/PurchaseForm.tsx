import React, { useState, ChangeEvent, FormEvent, JSX } from 'react';

// Define an interface for a purchase object
export interface Purchase {
  id: number;
  date: string;
  name: string;
  cost: number;
  category: string;
  person: string;
  assignees: string[];
}

// Define an interface for the component's props
interface PurchaseFormProps {
  onClose: () => void;
  onAddPurchase: (purchase: Purchase) => void;
}

// Define an interface for the form state (all fields are strings since they come from input values)
interface PurchaseFormData {
  date: string;
  name: string;
  cost: string;
  category: string;
  person: string;
  assignees: string;
}

/**
 * PurchaseForm Component
 * Renders a form that collects purchase data and submits a new Purchase object.
 * The onAddPurchase callback is called with the constructed Purchase object.
 */
export default function PurchaseForm({ onClose, onAddPurchase }: PurchaseFormProps): JSX.Element {
  const [formData, setFormData] = useState<PurchaseFormData>({
    date: '',
    name: '',
    cost: '',
    category: '',
    person: '',
    assignees: '',
  });

  /**
   * handleChange updates the form state when an input value changes.
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * handleSubmit constructs a Purchase object from the form data,
   * calls onAddPurchase, and then calls onClose.
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const purchase: Purchase = {
      id: Date.now(),
      date: formData.date,
      name: formData.name,
      cost: parseFloat(formData.cost),
      category: formData.category,
      person: formData.person,
      assignees: formData.assignees
        .split(',')
        .map((name) => name.trim())
        .filter((name) => name !== ''),
    };

    onAddPurchase(purchase);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
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
      {/* Assignees Input */}
      <div>
        <label htmlFor="assignees" className="block text-sm font-medium text-gray-900 dark:text-gray-200">
          Assignees (comma separated)
        </label>
        <input
          type="text"
          id="assignees"
          name="assignees"
          required
          value={formData.assignees}
          onChange={handleChange}
          placeholder="e.g. Alice, Bob, Carol"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm 
                     placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 
                     dark:border-gray-600 dark:text-gray-200"
        />
      </div>
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white 
                   hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Add Purchase
      </button>
    </form>
  );
}