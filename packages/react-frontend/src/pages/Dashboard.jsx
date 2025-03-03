import React, { useState } from 'react';
import Modal from '../components/Modal';
import PurchaseForm from '../components/PurchaseForm';
import EditableTable from './EditableTable';

export default function MainPage() {
    const [purchases, setPurchases] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Add a new purchase to the list of purchases
    const addPurchase = (purchase) => {
        setPurchases([...purchases, purchase]);
    };

    return (
        <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Roommate Cost Splitter</h1>
        <button
            onClick={() => setIsModalOpen(true)}
            className="mb-4 bg-indigo-600 text-white p-2 rounded"
        >
            Add Purchase
        </button>

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