import React, { useState } from 'react';
import Modal from '../components/Modal.js';
import PurchaseForm from '../components/PurchaseForm.js';
import EditableTable from './EditableTable.js';
import { Purchase } from '../types.js';



export default function MainPage() {
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // Add a new purchase to the list of purchases
    const addPurchase = (purchase: Purchase) => {
        setPurchases([...purchases, purchase]);
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

        <EditableTable purchases={purchases} />

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