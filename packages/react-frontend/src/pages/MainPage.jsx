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

    //add a new pruchase to the table
    const addPurchase = (e) => {
        e.preventDefault(); //prevent form submission
        const cost = parseFloat(newPurchase.cost);
        //split assignees to pay for the purchase by commas and trim extra spcaes
        const assignee_array = newPurchase.assignees.split(',')
            .map(name => name.trim()).filter (name => name); 
        const purchase = {
            id: Date.now(),
            date: newPurchase.date,
            name: newPurchase.name,
            cost: cost,
            category: newPurchase.category,
            person: newPurchase.person,
            assignees: assignee_array,
        };
        setPurchases([...purchases, purchase]); //add new purchase to the list
        //reset the form
        setNewPurchase({
            date: '',
            name: '',
            cost: '',
            category: '',
            person: '',
            assignees: '', 
        });
    }

    //calculate split amount (cost/assignees)
    const calculate_split = (purchase) => {
        if (purchase.assignees.length === 0) {
            return '-';
        }
        return (purchase.cost / purchase.assignees.length).toFixed(2);  //round to 2 decimal places
    }

    return (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Roommate Cost Splitter</h1>
          {/* Form to add a new purchase */}
          <form onSubmit={addPurchase} className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <input
              type="date"
              name="date"
              value={newPurchase.date}
              onChange={handleChange}
              className="border rounded p-2"
              placeholder="Date"
              required
            />
            <input
              type="text"
              name="name"
              value={newPurchase.name}
              onChange={handleChange}
              className="border rounded p-2"
              placeholder="Name of Purchase"
              required
            />
            <input
              type="number"
              step="0.01"
              name="cost"
              value={newPurchase.cost}
              onChange={handleChange}
              className="border rounded p-2"
              placeholder="Cost of Purchase"
              required
            />
            <input
              type="text"
              name="category"
              value={newPurchase.category}
              onChange={handleChange}
              className="border rounded p-2"
              placeholder="Category"
              required
            />
            <input
              type="text"
              name="person"
              value={newPurchase.person}
              onChange={handleChange}
              className="border rounded p-2"
              placeholder="Purchaser"
              required
            />
            <input
              type="text"
              name="assignees"
              value={newPurchase.assignees}
              onChange={handleChange}
              className="border rounded p-2"
              placeholder="Assignees (comma separated)"
              required
            />
            <button type="submit" className="sm:col-span-1 bg-indigo-600 text-white p-2 rounded">
              Add Purchase
            </button>
          </form>
    
          {/* Display the purchases in a table */}
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Date</th>
                <th className="border p-2">Purchase</th>
                <th className="border p-2">Cost</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Purchaser</th>
                <th className="border p-2">Assignees</th>
                <th className="border p-2">Split Amount</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase) => (
                <tr key={purchase.id}>
                  <td className="border p-2">{purchase.date}</td>
                  <td className="border p-2">{purchase.name}</td>
                  <td className="border p-2">${purchase.cost.toFixed(2)}</td>
                  <td className="border p-2">{purchase.category}</td>
                  <td className="border p-2">{purchase.person}</td>
                  <td className="border p-2">{purchase.assignees.join(', ')}</td>
                  <td className="border p-2">${calculate_split(purchase)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

};



