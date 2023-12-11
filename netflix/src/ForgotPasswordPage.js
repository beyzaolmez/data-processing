import React, { useState } from 'react';
import LogoImage from './Images/Netflix.png';
import './css/LogInPage.css';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your authentication logic here
    // For simplicity, I'm just checking if both email and password are not empty
    if (email && password) {
      // Perform authentication or API request here
      // If successful, you can navigate to the main content page
      // For demonstration purposes, I'm just setting isLoggedIn to true
      setIsLoggedIn(true);
    } else {
      setError('Please enter both email and password');
    }
  };

  return (
    <div id='mainGrid'>
      <img src={LogoImage} alt="Netflix" id="logoImage" />
      <div className="loginContainer">
        {isLoggedIn ? (
          <div className="loggedInInfo">
            <p>Welcome, {email}!</p>
            {/* Add additional information or navigation for logged-in users */}
          </div>
        ) : (
          <form className="loginForm" onSubmit={handleSubmit}>
            <label htmlFor='userEmail'>Email address:</label>
            <input
              type="email"
              id='userEmail'
              name='userEmail'
              placeholder='Input Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="userPassword">Password:</label>
            <input
              type="password"
              id="userPassword"
              name="userPassword"
              placeholder='Input Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <div className="authError">{error}</div>}

            <a id="FormLink" href="ForgotPasswordPage.js">Forgot password?</a>
            <input
              type="submit"
              value="Log-In"
              className="loginButton"
              name='LogInButton'
            />
          </form>
        )}
      </div>
    </div>
  );
}

