import React, { useState } from 'react';
import logo from '../Images/Netflix.png';
import '../css/RegisterPage.css'; // CSS file for styling
import axios from 'axios';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email !== confirmEmail) {
      alert('Emails do not match');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/users', {
        username,
        email,
        // Add other required fields for user registration
      });
      // Handle successful user registration
      console.log('User registered successfully!');
    } catch (error) {
      // Handle registration error
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="container">
      <img src={logo} className="logo" alt="logo" />
      <div className="register-form">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Add Confirm Email, Password, and Confirm Password inputs similarly */}
          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default { RegisterPage };
