// Dashboard.tsx
import React, { JSX, useEffect, useState } from 'react';
import Modal from '../components/Modal.js';
import PurchaseForm from '../components/PurchaseForm.js';
import EditableTable from './EditableTable.js';
import { Purchase } from '../types.js';

export default function MainPage(): JSX.Element {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [editPurchase, setEditPurchase] = useState<Purchase | null>(null);
  const token = localStorage.getItem('token');

  // Fetch purchases on mount
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/purchases', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setPurchases(data.purchases);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching purchases:', error);
      }
    };
    fetchPurchases();
  }, [token]);

  const addPurchase = (purchase: Purchase): void => {
    setPurchases([...purchases, purchase]);
  };

  const updatePurchase = (updated: Purchase): void => {
    setPurchases(purchases.map(p => (p.id === updated.id ? updated : p)));
  };

  const deletePurchase = (ids: number[]): void => {
    setPurchases(prev => prev.filter(p => !ids.includes(p.id)));
    setSelectedIds([]);
  };

  const toggleSelect = (id: number): void => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // When the user clicks "Edit" for a purchase, open the modal with that purchase preloaded
  const handleEditPurchase = (purchase: Purchase): void => {
    setEditPurchase(purchase);
    setIsModalOpen(true);
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
            onClick={() => {
              setEditPurchase(null);
              setIsModalOpen(true);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Purchase
          </button>
        </div>
      </div>

      <EditableTable 
        purchases={purchases} 
        selectedIds={selectedIds} 
        onToggleSelect={toggleSelect} 
        onEditPurchase={handleEditPurchase}
        onDeletePurchase={(id: number) => deletePurchase([id])}
      />

      <Modal
        isOpen={isModalOpen}
        onCloseRequested={() => setIsModalOpen(false)}
        headerLabel={editPurchase ? 'Edit Purchase' : 'Add New Purchase'}
      >
        <PurchaseForm 
          onClose={() => setIsModalOpen(false)} 
          onAddPurchase={editPurchase ? updatePurchase : addPurchase}
          initialPurchase={editPurchase || undefined}
        />
      </Modal>
    </div>
  );
}