import React, { useState } from 'react';

export default function PurchaseForm({ onClose, onAddPurchase }) {
    const [formData, setFormData] = useState({
        date: '',
        name: '',
        cost: '',
        category: '',
        person: '',
        assignees: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const purchase = {
            id: Date.now(),
            date: formData.date,
            name: formData.name,
            cost: parseFloat(formData.cost),
            category: formData.category,
            person: formData.person,
            assignees: formData.assignees
                .split(',')
                .map((name) => name.trim())
                .filter((name) => name),
        };
        onAddPurchase(purchase);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
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
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
             />
        </div>
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-gray-200">
                ame of Purchase
            </label>
            <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
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
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
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
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
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
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
        </div>
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
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
        </div>
        <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
            Add Purchase
        </button>
        </form>
    );
}