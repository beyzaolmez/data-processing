// DeleteButton.js
import React from 'react';
import axios from 'axios';

const DeleteButton = ({ itemId }) => {
    const handleDelete = () => {
        axios.delete(`http://localhost:5000/items/${itemId}`)
            .then(response => {
                console.log(response.data);
                // Optionally refresh the list here
            })
            .catch(error => console.error(error));
    };

    return (
        <button onClick={handleDelete}>Delete</button>
    );
};

export default DeleteButton;
