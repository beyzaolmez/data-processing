import React, { useState } from 'react';
import LogoImage from './Images/Netflix.png';
import './css/LogInPage.css';
    const ForgotPasswordForm = async () => {
        const [email, setEmail] = useState('');
        const [message, setMessage] = useState('');
      

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  try {
    const response = await fetch('http://localhost:5000/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage(data.message);
    } else {
      console.error('Forgot password failed', data);
      setMessage('Error: Unable to send password reset instructions.');
    }
  } catch (error) {
    console.error('Error during forgot password:', error);
    setMessage('Error: Internal Server Error');
  }
};

