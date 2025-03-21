// Dashboard.tsx
import React, { JSX, useEffect, useState } from 'react';
import Modal from '../components/Modal.js';
import PurchaseForm from '../components/PurchaseForm.js';
import EditableTable from './EditableTable.js';
import { Purchase } from '../types.js';

export default function MainPage(): JSX.Element {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // State for editing a purchase
  const [editPurchase, setEditPurchase] = useState<Purchase | null>(null);
  const token = localStorage.getItem('token');

  // Fetch purchases when component mounts
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/purchases', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          const mappedPurchases = data.purchases.map((p: any) => ({
            ...p,
            id: p._id, // Map _id to id
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

  // Function to add a new purchase or update an existing one
  const handleAddOrUpdatePurchase = (purchase: Purchase): void => {
    if (editPurchase) {
      // Update case: replace the purchase in state
      setPurchases(purchases.map(p => (p.id === purchase.id ? purchase : p)));
    } else {
      // Add case: append new purchase
      setPurchases([...purchases, purchase]);
    }
  };

  // Delete purchase function remains unchanged
  const handleDeletePurchase = async (id: string): Promise<void> => {
    try {
      const res = await fetch(`http://localhost:8000/api/purchases/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        setPurchases(prev => prev.filter(p => p.id !== id));
      } else {
        const data = await res.json();
        console.error('Error deleting purchase:', data.message);
      }
    } catch (error) {
      console.error('Network error deleting purchase:', error);
    }
  };

  // When user clicks the Edit button for a purchase, set editPurchase and open modal.
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
            setEditPurchase(null); // Clear edit state for new purchase
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
          setEditPurchase(null); // Reset editPurchase when closing modal
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