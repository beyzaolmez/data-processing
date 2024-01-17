import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './auth/LogInPage.js';
import { RegisterPage } from './auth/RegisterPage.js';
import SubscriptionPage from './SubscriptionPage.js';
import AccountPage from './AccountPage.js';
import ProfilePage from './ProfilePage.js';
import ForgotPasswordPage from './auth/ForgotPasswordPage.js';

function App() {
  
  return (
    <Routes>
      <Route index element={<Navigate to="/register" replace/>}></Route>
      <Route exact path='/register' Component={RegisterPage}/>
      <Route exact path='/login' Component={LoginPage}/>
      <Route exact path='/subscription' Component={SubscriptionPage}/>
      <Route exact path='/account' Component={AccountPage}/>
      <Route exact path='/forgotPassword' Component={ForgotPasswordPage}/>
      <Route exact path='/profile' Component={ProfilePage}/>
    </Routes>
  );
}

export default App;
