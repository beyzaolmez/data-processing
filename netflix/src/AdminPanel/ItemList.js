import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/AdminPanel.css';

const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/items')
            .then(response => setItems(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="admin-container">
            {items.map(item => (
                <div key={item.id}>
                    {item.name}
                    {}
                </div>
            ))}
        </div>
    );
};

export default ItemList;
