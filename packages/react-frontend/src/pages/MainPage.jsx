import React, { useState } from 'react';

export default function MainPage() {

    //temp but state for storing purchase recordds
    const [purchases, setPurchases] = useState([]);

    //state for purchase form
    const [newPurchase, setNewPurchase] = useState({
        date: '',
        name: '',
        cost: '',
        category: '',
        person: '',
        assignees: '',
    });

    //update form state on change
    const handleChange = (e) => {
        setNewPurchase({
            ...newPurchase,
            [e.target.name]: e.target.value,
        });
    }

