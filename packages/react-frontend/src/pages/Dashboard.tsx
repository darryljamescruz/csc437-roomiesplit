// Dashboard.tsx
import React, { JSX, useState } from 'react';
import Modal from '../components/Modal.js';
import PurchaseForm from '../components/PurchaseForm.js';
import EditableTable from './EditableTable.js';
import { Purchase } from '../types.js';

export default function MainPage(): JSX.Element {
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    // Change selectedIds to string[]
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
    // Add a new purchase to the list
    const addPurchase = (purchase: Purchase): void => {
      setPurchases([...purchases, purchase]);
    };
  
    // Delete purchases by filtering out those with IDs in selectedIds
    const deletePurchase = (ids: string[]): void => {
      setPurchases(prev => prev.filter(p => !ids.includes(p.id)));
      setSelectedIds([]); // Clear selection after deletion
    };
  
    return (
      <div className="p-4">
        {/* Header container: Title, Add Purchase and Delete Selected (if any) buttons */}
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
          onDeletePurchase={(id: string) => deletePurchase([id])} // Deleting a single item
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