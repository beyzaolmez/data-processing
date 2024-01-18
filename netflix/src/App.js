import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LogInPage from './auth/LoginPage.js';
import RegisterPage from './auth/RegisterPage.js';
import SubscriptionPage from './SubscriptionPage.js';
import AccountPage from './AccountPage.js';
import ProfilePage from './ProfilePage.js';
import ForgotPasswordPage from './auth/ForgotPasswordPage.js';
import HomePage from './HomePage/HomePage.js';

function App() {
  /* const [data, setData] = useState([])
  useEffect(() => {
      fetch('http://localhost:8080/index/users')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err))
    }, [])
  return (
    /*<Routes>
      <Route index element={<Navigate to="/register" replace/>}></Route>
      <Route exact path='/register' Component={RegisterPage}/>
      <Route exact path='/login' Component={LogInPage}/>
      <Route exact path='/subscription' Component={SubscriptionPage}/>
      <Route exact path='/account' Component={AccountPage}/>
      <Route exact path='/forgotPassword' Component={ForgotPasswordPage}/>
      <Route exact path='/profile' Component={ProfilePage}/>
    </Routes>
    
    <div>
      <table>
        <thead>
          <tr>
            <th>User email</th>
          </tr>
        </thead>
        <tbody>
        {data.map((d, i) => (
          <tr key={i}>
            <td>{d.user_email}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>)
    */
   return(<HomePage/>)
   
}

export default App;
