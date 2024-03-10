import React, { useState } from 'react';
import logo from '../Images/Netflix.png';
import '../css/RegisterPage.css';
import config from '../config';

export default function RegisterPage() {
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
      const response = await fetch(config.apiUrl+'/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, application/xml',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const contentType = response.headers.get('Content-Type');

        if (contentType.includes('application/json')) {
          const data = await response.json();
          console.log('Register successful:', data.message);
        } else if (contentType.includes('application/xml')) {
          const data = await response.text();
          console.log('Register successful:', data);
        } else {
          console.error('Unexpected content type:', contentType);
        }
      } else {
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.error(data.message || 'Register failed');
        } else {
          const data = await response.text();
          console.error('Unexpected content type:', contentType, data);
        }
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="container">
      <img src={logo} className="logo" alt="logo" />
      <div className="register-form">
        <form onSubmit={handleSubmit}>
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
          <div className="input-group">
            <label htmlFor="email">Confirm Email Address:</label>
            <input
              type="email"
              id="confirmEmail"
              placeholder="Confirm your email address"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export {RegisterPage};
