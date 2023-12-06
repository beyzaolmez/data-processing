import React, { useState } from 'react';
import './css/LogInPage.css';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your authentication logic here
    // For simplicity, I'm just checking if both email and password are not empty
    if (email && password) {
      // Perform authentication or API request here
      // If successful, you can navigate to the main content page
      console.log('Login successful');
    } else {
      setError('Please enter both email and password');
    }
  };

  return (
    <div id='mainGrid'>
      <div className="loginContainer">
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>Email address:</label>
          <input
            type="email"
            placeholder='Input Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password:</label>
          <input
            type="password"
            placeholder='Input Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <div className="authError">{error}</div>}

          {/* Uncomment the following lines if you have a registration page */}
          {/* <Link to="/register" className="registerLink">
            New user? <strong>Sign Up</strong>
          </Link> */}

          <input
            type="submit"
            value="Log In"
            className="loginButton"
            name='LogInButton'
          />
        </form>
      </div>
    </div>
  );
}
