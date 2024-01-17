import React, { useState } from 'react';

const AdminForm = () => {
    const [adminName, setAdminName] = useState('');
    const [adminEmail, setAdminEmail] = useState('');
    const isValidEmail = email => /\S+@\S+\.\S+/.test(email);
    const [showAdminForm, setShowAdminForm] = useState(false);

    const handleAdminSubmit = (event) => {
        event.preventDefault();
        setShowAdminForm(false);
    };

    return (
        <form onSubmit={handleAdminSubmit}>
            <label>Enter Admin Name:</label>
            <input type="text" value={adminName} onChange={(e) => setAdminName(e.target.value)} />
            
            <label>Enter Admin Email:</label>
            <input type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />

            <input 
                type="submit" 
                value="Submit Admin Details" 
                disabled={!adminName || !isValidEmail(adminEmail)}
            />
        </form>
    );
};

export default AdminForm;
