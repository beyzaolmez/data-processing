// AddItemForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddItemForm = () => {
    const [itemName, setItemName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/items', { name: itemName })
            .then(response => {
                console.log(response.data);
                setItemName('');
            })
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={itemName} 
                onChange={(e) => setItemName(e.target.value)} 
                placeholder="Enter item name" 
            />
            <button type="submit">Add Item</button>
        </form>
    );
};

export default AddItemForm;
