import React, { JSX, useState } from 'react';
import Modal from '../components/Modal.js';
import PurchaseForm from '../components/PurchaseForm.js';
import EditableTable from './EditableTable.js';
import { Purchase } from '../types.js';



export default function MainPage(): JSX.Element {
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
    // Add a new purchase to the list
    const addPurchase = (purchase: Purchase): void => {
      setPurchases([...purchases, purchase]);
    };
  
    // Delete a purchase by filtering it out from state
    const deletePurchase = (id: number): void => {
      setPurchases(prev => prev.filter(purchase => purchase.id !== id));
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
  
        {/* Pass deletePurchase to EditableTable so the delete option appears */}
        <EditableTable purchases={purchases} onDeletePurchase={deletePurchase} />
  
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