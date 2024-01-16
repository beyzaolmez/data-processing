import React from 'react';
import axios from 'axios';
import '../css/AdminPanel.css';

const DeleteButton = ({ itemId }) => {
    const handleDelete = () => {
        axios.delete(`http://localhost:5000/items/${itemId}`)
            .then(response => {
                console.log(response.data);
                window.location.reload(); 
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="admin-container">
            <button onClick={handleDelete}>Go back</button>
        </div>
    );
};

export default DeleteButton;
