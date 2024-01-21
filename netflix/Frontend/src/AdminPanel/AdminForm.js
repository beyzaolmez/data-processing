import React, { useState } from 'react';

const AddComponent = () => {
    const [email, setEmail] = useState('');
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

    const validateEmail = (email) => {
        const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}]))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setIsSubmitEnabled(validateEmail(e.target.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await fetch('/api/saveAdmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                window.location.reload();
            } else {
                throw new Error('Failed to save admin data');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    value={email} 
                    onChange={handleEmailChange} 
                    placeholder="Email" 
                />
                <button type="submit" disabled={!isSubmitEnabled}>Submit</button>
            </form>
        </div>
    );
};

export default AddComponent;
