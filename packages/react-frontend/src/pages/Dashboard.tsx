// Dashboard.tsx
import React, { JSX, useEffect, useState } from 'react';
import Modal from '../components/Modal.js';
import PurchaseForm from '../components/PurchaseForm.js';
import EditableTable from './EditableTable.js';
import { Purchase } from '../types.js';

export default function MainPage(): JSX.Element {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const token = localStorage.getItem('token');

  // Fetch purchases from the backend when the component mounts
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
          // Map each purchase so that it has an 'id' property from _id
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

    fetchPurchases();
  }, [token]);

  const addPurchase = (purchase: Purchase): void => {
    setPurchases([...purchases, purchase]);
  };

  // function to handle deleting a single purchase from the backend
  const handleDeletePurchase = async (id: string): Promise<void> => {
    try {
      const res = await fetch(`http://localhost:8000/api/purchases/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (res.ok) {
        // Remove the purchase from state
        setPurchases(prev => prev.filter(p => p.id !== id));
      } else {
        const data = await res.json();
        console.error('Error deleting purchase:', data.message);
      }
    } catch (error) {
      console.error('Network error deleting purchase:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Roommate Cost Splitter</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add Purchase
        </button>
      </div>

      <EditableTable 
        purchases={purchases} 
        onEditPurchase={(purchase: Purchase) => { /* will pass the edit function */ }} 
        onDeletePurchase={handleDeletePurchase} // pass the delete function
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