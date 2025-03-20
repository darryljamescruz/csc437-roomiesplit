// src/pages/EditableTable.jsx
// **Component to display a table of purchases that can be edited.**
import React from 'react';
import { Purchase } from '../types.js';

export default function EditableTable({ purchases }: { purchases: Purchase[] }) {
  // Calculate split amount: cost divided by number of assignees
  const calculateSplit = (purchase: Purchase) => {
    if (purchase.assignees.length === 0) return '-';
    return (purchase.cost / purchase.assignees.length).toFixed(2);
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3 border-r">Date</th>
            <th scope="col" className="px-4 py-3 border-r">Purchase</th>
            <th scope="col" className="px-4 py-3 border-r">Cost</th>
            <th scope="col" className="px-4 py-3 border-r">Category</th>
            <th scope="col" className="px-4 py-3 border-r">Purchaser</th>
            <th scope="col" className="px-4 py-3 border-r">Assignees</th>
            <th scope="col" className="px-4 py-3">Split Amount</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => (
            <tr key={purchase.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-4 py-3 border-r">{purchase.date}</td>
              <td className="px-4 py-3 border-r">{purchase.name}</td>
              <td className="px-4 py-3 border-r">${purchase.cost.toFixed(2)}</td>
              <td className="px-4 py-3 border-r">{purchase.category}</td>
              <td className="px-4 py-3 border-r">{purchase.person}</td>
              <td className="px-4 py-3 border-r">{purchase.assignees.join(', ')}</td>
              <td className="px-4 py-3">${calculateSplit(purchase)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}