// Dashboard.tsx
import React, { JSX, useEffect, useState } from 'react';
import Modal from '../components/Modal.js';
import PurchaseForm from '../components/PurchaseForm.js';
import EditableTable from './EditableTable.js';
import { Purchase } from '../types.js';

export default function MainPage(): JSX.Element {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editPurchase, setEditPurchase] = useState<Purchase | null>(null);
  const token = localStorage.getItem('token');

  // Function to fetch purchases from the backend and update state.
  const fetchPurchases = async () => {
    try {
      const res = await fetch('/api/purchases', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        // Map each purchase so that it has a unique 'id' from _id
        const mappedPurchases = data.purchases.map((p: any) => ({
          ...p,
          id: p._id,
        }));
        setPurchases(mappedPurchases);
      } else {
        console.error('Error fetching purchases:', data.message);
      }
    } catch (error) {
      console.error('Network error fetching purchases:', error);
    }
  };

  // Fetch purchases on mount
  useEffect(() => {
    fetchPurchases();
  }, [token]);

  // Refectch List after Updating or Adding a Purchase
  const handleAddOrUpdatePurchase = async (purchase: Purchase): Promise<void> => {
    await fetchPurchases();
  };

  // Delete purchase by sending a DELETE request and re-fetching the list
  const handleDeletePurchase = async (id: string): Promise<void> => {
    try {
      const res = await fetch(`/api/purchases/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        await fetchPurchases();
      } else {
        const data = await res.json();
        console.error('Error deleting purchase:', data.message);
      }
    } catch (error) {
      console.error('Network error deleting purchase:', error);
    }
  };

  // When a purchase is to be edited, set the editPurchase state and open the modal.
  const handleEditPurchase = (purchase: Purchase): void => {
    setEditPurchase(purchase);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Roommate Cost Splitter</h1>
        <button
          onClick={() => {
            setEditPurchase(null); // Clear edit state for a new purchase
            setIsModalOpen(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add Purchase
        </button>
      </div>

      <EditableTable 
        purchases={purchases} 
        onEditPurchase={handleEditPurchase} 
        onDeletePurchase={handleDeletePurchase} 
      />

      <Modal
        isOpen={isModalOpen}
        onCloseRequested={() => {
          setIsModalOpen(false);
          setEditPurchase(null);
        }}
        headerLabel={editPurchase ? 'Edit Purchase' : 'Add New Purchase'}
      >
        <PurchaseForm 
          onClose={() => {
            setIsModalOpen(false);
            setEditPurchase(null);
          }} 
          onAddPurchase={handleAddOrUpdatePurchase} 
          initialPurchase={editPurchase || undefined} 
        />
      </Modal>
    </div>
  );
}