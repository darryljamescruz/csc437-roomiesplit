// Dashboard.tsx
import React, { JSX, useEffect, useState } from 'react';
import Modal from '../components/Modal.js';
import PurchaseForm from '../components/PurchaseForm.js';
import EditableTable from './EditableTable.js';
import { Purchase } from '../types.js';

export default function MainPage(): JSX.Element {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const token = localStorage.getItem('token');

  // Fetch purchases from the backend when the component mounts
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/purchases', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (res.ok) {
            // Map each purchase so that it has an id property taken from _id
            const mappedPurchases = data.purchases.map((p: any) => ({
            ...p,
            id: p._id, // ensure id is defined and unique
          }));
          setPurchases(mappedPurchases);
        } else {
          console.error('Error fetching purchases:', data.message);
        }
      } catch (error) {
        console.error('Network error fetching purchases:', error);
      }
    };

    fetchPurchases();
  }, [token]);

  const addPurchase = (purchase: Purchase): void => {
    setPurchases([...purchases, purchase]);
  };

  const deletePurchase = (ids: string[]): void => {
    setPurchases(prev => prev.filter(p => !ids.includes(p.id)));
    setSelectedIds([]);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Roommate Cost Splitter</h1>
        <div className="flex items-center space-x-2">
          {selectedIds.length > 0 && (
            <button
              onClick={() => deletePurchase(selectedIds)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete Selected
            </button>
          )}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Purchase
          </button>
        </div>
      </div>

      <EditableTable 
        purchases={purchases} 
        onEditPurchase={(purchase: Purchase) => { /* your edit logic */ }} 
        onDeletePurchase={(id: string) => deletePurchase([id])} 
      />

      <Modal
        isOpen={isModalOpen}
        onCloseRequested={() => setIsModalOpen(false)}
        headerLabel="Add New Purchase"
      >
        <PurchaseForm onClose={() => setIsModalOpen(false)} onAddPurchase={addPurchase} />
      </Modal>
    </div>
  );
}