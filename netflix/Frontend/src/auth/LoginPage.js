import React, { useState } from 'react';
import LogoImage from '../Images/Netflix.png';
import '../css/LogInPage.css';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true);
        console.log('Login successful:', data.user);
      } else {
        setError(data.message || 'Login failed');
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
export {LogIn};