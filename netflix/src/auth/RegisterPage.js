import React from 'react';
import logo from './../Images/Netflix.png';
import './../css/RegisterPage.css'; // CSS file for styling

const RegisterPage = () => {

  return (
    <div className="container">
    <img src={logo} className="logo" alt="logo" />
      <div className="register-form">
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" placeholder="Enter your username" />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email Address:</label>
          <input type="email" id="email" placeholder="Enter your email address" />
        </div>
        <div className="input-group">
          <label htmlFor="confirmEmail">Confirm Email Address:</label>
          <input type="email" id="confirmEmail" placeholder="Confirm your email address" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder="Enter your password" />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" placeholder="Confirm your password" />
        </div>
        <button className="register-btn">Register</button>
      </div>
    </div>
  );
};

export {RegisterPage};
