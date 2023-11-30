import React from 'react';
import './css/LogInPage.css';

export default function LogIn(){
    return (
    <div id='mainGrid'>
        <div className="loginContainer">
            <form className="loginForm" onSubmit="#">
                <label>Email address:</label>
                <input type="email" placeholder='Input Email'/>
              
                <label>Password:</label>
                <input type="password" placeholder='Input Password'/>
                
                {/* <Link to="/register" className="registerLink">New user? <strong>Sign Up</strong></Link> */}
                <input type="submit" value="Log In" className="loginButton" name='LogInButton'/>
                {/* {error && <div className="authError">{  }</div>} */}
            </form>
        </div>
    </div>
    );
}