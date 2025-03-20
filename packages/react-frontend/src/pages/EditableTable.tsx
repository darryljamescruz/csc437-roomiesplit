// src/pages/EditableTable.jsx
import React, { JSX } from 'react';
import { Purchase } from '../types.js';

interface EditableTableProps {
  purchases: Purchase[];
  onDeletePurchase?: (id: number) => void;
}

export default function EditableTable({ purchases, onDeletePurchase }: EditableTableProps): JSX.Element {
  // Calculate split amount: cost divided by number of assignees
  const calculateSplit = (purchase: Purchase): string => {
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
            <th scope="col" className="px-4 py-3 border-r">Split Amount</th>
            {purchases.length > 0 && onDeletePurchase && (
              <th scope="col" className="px-4 py-3">Delete</th>
            )}
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
              <td className="px-4 py-3 border-r">${calculateSplit(purchase)}</td>
              {onDeletePurchase && (
                <td className="px-4 py-3">
                  <button
                    onClick={() => onDeletePurchase(purchase.id)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}