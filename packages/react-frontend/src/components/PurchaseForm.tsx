import React, { useState, ChangeEvent, FormEvent, useEffect, JSX } from 'react';
import { PurchaseFormData, Purchase } from '../types.js';

interface PurchaseFormProps {
  onClose: () => void;
  onAddPurchase: (purchase: Purchase) => void;
  initialPurchase?: Purchase; // For editing an existing purchase
}

export default function PurchaseForm({ onClose, onAddPurchase, initialPurchase }: PurchaseFormProps): JSX.Element {
  // Initialize form state from initialPurchase if provided.
  const [formData, setFormData] = useState<Omit<PurchaseFormData, 'assignees'>>({
    date: initialPurchase ? initialPurchase.date : '',
    name: initialPurchase ? initialPurchase.name : '',
    cost: initialPurchase ? initialPurchase.cost.toString() : '',
    category: initialPurchase ? initialPurchase.category : '',
    person: initialPurchase ? initialPurchase.person : '',
  });
  // Separate state for the raw assignees input (comma-separated string)
  const [assigneesInput, setAssigneesInput] = useState<string>(initialPurchase ? initialPurchase.assignees.join(', ') : '');

  useEffect(() => {
    if (initialPurchase) {
      setFormData({
        date: initialPurchase.date,
        name: initialPurchase.name,
        cost: initialPurchase.cost.toString(),
        category: initialPurchase.category,
        person: initialPurchase.person,
      });
      setAssigneesInput(initialPurchase.assignees.join(', '));
    }
  }, [initialPurchase]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAssigneesChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAssigneesInput(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    const assigneesArray = assigneesInput.split(',').map(s => s.trim()).filter(s => s.length > 0);
    
    const purchase: Purchase = {
      id: initialPurchase ? initialPurchase.id : `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      date: formData.date,
      name: formData.name,
      cost: parseFloat(formData.cost),
      category: formData.category,
      person: formData.person,
      assignees: assigneesArray,
    };

    try {
      const token = localStorage.getItem('token');
      const url = initialPurchase 
        ? `http://localhost:8000/api/purchases/${purchase.id}` 
        : 'http://localhost:8000/api/purchases';
      const method = initialPurchase ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify(purchase),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error('Error creating/updating purchase:', data.message);
      } else {
        onAddPurchase(data.purchase);
        onClose();
      }
    } catch (error) {
      console.error('Network error creating/updating purchase:', error);
    }
  };

  return (
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
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 
                     focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
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
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 
                     focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
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
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 
                     focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
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
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 
                     focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
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
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 
                     focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        />
      </div>
      {/* Assignees Input as a simple text field */}
      <div>
        <label htmlFor="assignees" className="block text-sm font-medium text-gray-900 dark:text-gray-200">
          Assign Roommates (comma-separated)
        </label>
        <input
          type="text"
          id="assignees"
          name="assignees"
          required
          value={assigneesInput}
          onChange={handleAssigneesChange}
          placeholder="e.g. alice@example.com, bob@example.com"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 
                     focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm 
                   hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {initialPurchase ? 'Update Purchase' : 'Add Purchase'}
      </button>
    </form>
  );
}