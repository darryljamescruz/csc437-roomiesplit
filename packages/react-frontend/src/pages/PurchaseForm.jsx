import React, { useState } from 'react';

export default function PurchaseForm({ onClose, onAddPurchase }) {
    // Form data state
    const [formData, setFormData] = useState({
        date: '',
        name: '',
        cost: '',
        category: '',
        person: '',
        assignees: '',
    });

    // Update the form data when the user types
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const purchase = {
            id: Date.now(),
            ...formData,
            cost: parseFloat(formData.cost),
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
            <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="border rounded p-2"
                required
            />
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border rounded p-2"
                placeholder="Name of Purchase"
                required
            />
            <input
                type="number"
                step="0.01"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                className="border rounded p-2"
                placeholder="Cost of Purchase"
                required
            />
            <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="border rounded p-2"
                placeholder="Category"
                required
            />
            <input
                type="text"
                name="person"
                value={formData.person}
                onChange={handleChange}
                className="border rounded p-2"
                placeholder="Purchaser"
                required
            />
            <input
                type="text"
                name="assignees"
                value={formData.assignees}
                onChange={handleChange}
                className="border rounded p-2"
                placeholder="Assignees (comma separated)"
                required
            />
            <button type="submit" className="bg-indigo-600 text-white p-2 rounded">
                Add Purchase
            </button>
        </form>
    );
}