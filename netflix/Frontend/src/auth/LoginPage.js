import React, { useState } from 'react';
import LogoImage from '../Images/Netflix.png';
import '../css/LogInPage.css';

const MAX_LOGIN_ATTEMPTS = 3;

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  const storedLoginAttempts = localStorage.getItem('loginAttempts');
  if (storedLoginAttempts) {
    setLoginAttempts(parseInt(storedLoginAttempts, 10));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, application/xml',
        },
        body: JSON.stringify({ email, password }),
      });

      const contentType = response.headers.get('Content-Type');

      if(response.ok) {
        if (contentType.includes('application/json')) {
        const data = await response.json();
        handleSuccess(data);
        } else if (contentType.includes('application/xml')) {
          const xmlString = await response.text();
          handleXMLSuccess(xmlString);
        } else {
          console.error('Unexpected content type:', contentType);
          handleError('Unexpected content type');
        }
      } else {
        setError('Login failed');
        setLoginAttempts(loginAttempts + 1);

        if (loginAttempts + 1 === MAX_LOGIN_ATTEMPTS) {
          setError('Account blocked!');
        }
      }
      
    } catch (error) {
      console.error('Error during login:', error);
      handleError('Internal Server Error');
    }
  };

  const handleSuccess = (data) => {
    setIsLoggedIn(true);
    console.log('Login successful:', data.user);
  };

  const handleXMLSuccess = (xmlString) => {
    console.log('XML Response:', xmlString);
    setIsLoggedIn(true);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage || 'Login failed');
  };

  return (
    <div id='mainGrid'>
      <img src={LogoImage} alt="Netflix" id="logoImage" />
      <div className="loginContainer">
        {isLoggedIn ? (
          <div className="loggedInInfo">
            <p>Welcome, {email}!</p>
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
export { LogIn };
