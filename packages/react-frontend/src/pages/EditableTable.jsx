// src/pages/EditableTable.jsx
// **Component to display a table of purchases that can be edited.**
import React from 'react';
export default function EditableTable({ purchases }) {
  //calculate split amount: cost divided by number of assignees
  const calculateSplit = (purchase) => {
    if (purchase.assignees.length === 0) return '-';
    return (purchase.cost / purchase.assignees.length).toFixed(2);
  };

  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2">Date</th>
          <th className="border p-2">Purchase</th>
          <th className="border p-2">Cost</th>
          <th className="border p-2">Category</th>
          <th className="border p-2">Purchaser</th>
          <th className="border p-2">Assignees</th>
          <th className="border p-2">Split Amount</th>
        </tr>
      </thead>
      <tbody>
        {purchases.map((purchase) => (
          <tr key={purchase.id}>
            <td className="border p-2">{purchase.date}</td>
            <td className="border p-2">{purchase.name}</td>
            <td className="border p-2">${purchase.cost.toFixed(2)}</td>
            <td className="border p-2">{purchase.category}</td>
            <td className="border p-2">{purchase.person}</td>
            <td className="border p-2">{purchase.assignees.join(', ')}</td>
            <td className="border p-2">${calculateSplit(purchase)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}