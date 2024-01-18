import React from 'react';
import {BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LogInPage from './auth/LoginPage.js';
import RegisterPage from './auth/RegisterPage.js';
import SubscriptionPage from './SubscriptionPage.js';
import AccountPage from './AccountPage.js';
import ProfilePage from './ProfilePage.js';
import ForgotPasswordPage from './auth/ForgotPasswordPage.js';
import AdminPanel from './AdminPanel.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/login" replace/>}></Route>
        <Route exact path='/register' Component={RegisterPage}/>
        <Route exact path='/login' Component={LogInPage}/>
        <Route exact path='/subscription' Component={SubscriptionPage}/>
        <Route exact path='/account' Component={AccountPage}/>
        <Route exact path='/forgotPassword' Component={ForgotPasswordPage}/>
        <Route exact path='/profile' Component={ProfilePage}/>
        <Route exact path='/adminPanel' Component={AdminPanel}/>
      </Routes>
    </BrowserRouter>);
}

export default App;
