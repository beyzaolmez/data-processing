import React, { useState, useEffect } from 'react';
import LogoImage from './Images/Netflix.png';
import './css/LogInPage.css';

const MAX_LOGIN_ATTEMPTS = 3;

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  useEffect(() => {
    const storedLoginAttempts = localStorage.getItem('loginAttempts');
    if (storedLoginAttempts) {
      setLoginAttempts(parseInt(storedLoginAttempts, 10));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true);
        setLoginAttempts(0); // Reset login attempts on successful login
        localStorage.removeItem('loginAttempts'); // Clear stored attempts
        document.cookie = `loggedIn=true; max-age=3600`; // Set a cookie for 1 hour (adjust as needed)
        console.log('Login successful:', data.user);
      } else {
        setError(data.message || 'Login failed');
        setLoginAttempts(loginAttempts + 1);

        if (loginAttempts + 1 === MAX_LOGIN_ATTEMPTS) {
          // Block account after the maximum allowed attempts
          console.log('Account blocked!');
          // You may want to implement further actions like notifying the user or locking the account in the database
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Internal Server Error');
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
};

export default LogIn;
