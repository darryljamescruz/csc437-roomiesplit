// src/pages/EditableTable.jsx
import React, { JSX } from 'react';
import { Purchase } from '../types.js';

interface EditableTableProps {
  purchases: Purchase[];
  selectedIds: number[];
  onToggleSelect: (id: number) => void;
}

export default function EditableTable({ purchases, selectedIds, onToggleSelect }: EditableTableProps): JSX.Element {
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
            {/* New Selection Column Header */}
            <th className="px-4 py-3 border-r">Select</th>
            <th className="px-4 py-3 border-r">Date</th>
            <th className="px-4 py-3 border-r">Purchase</th>
            <th className="px-4 py-3 border-r">Cost</th>
            <th className="px-4 py-3 border-r">Category</th>
            <th className="px-4 py-3 border-r">Purchaser</th>
            <th className="px-4 py-3 border-r">Assignees</th>
            <th className="px-4 py-3">Split Amount</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => {
            const isSelected = selectedIds.includes(purchase.id);
            return (
              <tr
                key={purchase.id}
                className={`cursor-pointer ${isSelected ? 'bg-blue-100 dark:bg-blue-900' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700`}
              >
                {/* Selection Column with checkbox */}
                <td className="px-4 py-3 border-r">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelect(purchase.id)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </td>
                <td className="px-4 py-3 border-r">{purchase.date}</td>
                <td className="px-4 py-3 border-r">{purchase.name}</td>
                <td className="px-4 py-3 border-r">${purchase.cost.toFixed(2)}</td>
                <td className="px-4 py-3 border-r">{purchase.category}</td>
                <td className="px-4 py-3 border-r">{purchase.person}</td>
                <td className="px-4 py-3 border-r">{purchase.assignees.join(', ')}</td>
                <td className="px-4 py-3">${calculateSplit(purchase)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}