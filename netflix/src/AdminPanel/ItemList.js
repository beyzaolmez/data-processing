// ItemList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/items')
            .then(response => setItems(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            {items.map(item => (
                <div key={item.id}>
                    {item.name} {}
                    {/* DeleteButton Component here */}
                </div>
            ))}
        </div>
    );
};

export default ItemList;
