import React from 'react';

export default function LogIn(){
    return (
        <div className="loginContainer">
            <form className="loginForm" onSubmit="#">
                <label>Email address:</label>
                <div className="loginInputContainer">
                    <img src="#" alt="" className="inputIcon" />
                    <input 
                        type="email" 
                        
                        placeholder='Input Email'
                    />
                </div>
                <label>Password:</label>
                <div className="loginInputContainer">
                    
                    <input
                        type="password" placeholder='Input Password'/>
                </div>
                {/* <Link to="/register" className="registerLink">New user? <strong>Sign Up</strong></Link> */}
                <input type="submit" value="Log In" className="loginButton" name='LogInButton'/>
                {/* {error && <div className="authError">{  }</div>} */}
            </form>
        </div>
    );
}