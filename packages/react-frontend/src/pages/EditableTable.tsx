import React, { JSX } from 'react';
import { Purchase } from '../types.js';

interface EditableTableProps {
  purchases: Purchase[];
  onEditPurchase: (purchase: Purchase) => void;
  onDeletePurchase: (id: string) => void;
}

export default function EditableTable({ purchases, onEditPurchase, onDeletePurchase }: EditableTableProps): JSX.Element {
  const calculateSplit = (purchase: Purchase): string => {
    if (purchase.assignees.length === 0) return '-';
    return (purchase.cost / purchase.assignees.length).toFixed(2);
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-4 py-3 border-r">Date</th>
            <th className="px-4 py-3 border-r">Purchase</th>
            <th className="px-4 py-3 border-r">Cost</th>
            <th className="px-4 py-3 border-r">Category</th>
            <th className="px-4 py-3 border-r">Purchaser</th>
            <th className="px-4 py-3 border-r">Assignees</th>
            <th className="px-4 py-3 border-r">Split Amount</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => (
            <tr
              key={purchase.id}
              className="bg-white dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <td className="px-4 py-3 border-r">{purchase.date}</td>
              <td className="px-4 py-3 border-r">{purchase.name}</td>
              <td className="px-4 py-3 border-r">${purchase.cost.toFixed(2)}</td>
              <td className="px-4 py-3 border-r">{purchase.category}</td>
              <td className="px-4 py-3 border-r">{purchase.person}</td>
              <td className="px-4 py-3 border-r">{purchase.assignees.join(', ')}</td>
              <td className="px-4 py-3 border-r">${calculateSplit(purchase)}</td>
              <td className="px-4 py-3 space-x-1">
                <button
                  onClick={() => onEditPurchase(purchase)}
                  className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeletePurchase(purchase.id)}
                  className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}