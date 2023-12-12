import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './auth/LogInPage.js';
import { RegisterPage } from './auth/RegisterPage.js';
import SubscriptionPage from './SubscriptionPage.js';


function App() {
  
  return (
  <Router>
    <Routes>
      <Route index element={<Navigate to="/register" replace/>}></Route>
      <Route exact path='/register' Component={RegisterPage}/>
      <Route exact path='/login' Component={LoginPage}/>
      <Route exact path='/subscription' Component={SubscriptionPage}/>
    </Routes>
  </Router>
  );
}

export default App;
