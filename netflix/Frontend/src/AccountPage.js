import React from 'react';
import './css/AccountPage.css';
import account from './Images/account2.svg';
import config from './config';

export default function AccountPage() {
  return (
        <main>
            <div className="content">
                <h1>Account</h1>
                <div id="member">
                    <img src={account} alt="account icon" />
                    <p> Member since September, 2023</p>
                </div>
            </div>
            <div className="content">
                <div>
                    <h2>Membership & Billing</h2>
                    <div id="cancel"><a>Cancel Membership</a></div>
                </div>
                <div id="membership-and-billing">
                    <div id="membership">
                        <div id="email">
                            <p>Email: someone@gmail.com</p>
                            <a href="#">Change account email</a>
                        </div>
                        <div id="password">
                            <p>Password: ********</p>
                            <a href="#">Change password</a>
                        </div>
                    </div>
                    <div id="billing">
                        <div id="billing-info">
                            <p>users payment method</p>
                            <a href="#">Manage Billing</a>
                        </div>
                        <p>Next billing date is 15 November 2023</p>
                    </div>
                </div>
            </div>
            <div className="content">
                <h2>Plan Details</h2>
                <div id="planning">
                    <p>Standart HD</p>
                    <a href="/subscription">Change Plan</a>
                </div>
            </div>
        </main>
  );
}
