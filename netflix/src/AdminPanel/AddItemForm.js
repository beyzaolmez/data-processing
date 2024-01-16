import React, { useState } from 'react';
import axios from 'axios';
import '../css/AdminPanel.css';

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
        <div className="admin-container">
            <form onSubmit={handleSubmit}>
                <input
                    className='TextInput' 
                    type="text" 
                    value={itemName} 
                    onChange={(e) => setItemName(e.target.value)} 
                    placeholder="Enter item name" 
                />
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
};

export default AddItemForm;
