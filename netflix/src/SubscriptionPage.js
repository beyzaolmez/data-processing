import React, {useState} from 'react';
import './css/SubscriptionPage.css'; // CSS file for styling
import LogoImage from './Images/Netflix.png'; // Import your logo image

const SubscriptionPage = () => {

const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="container">
      <img src={LogoImage} alt="Logo" className="logo" />
      <div className="subscription-form">
        <p className="headnote">
          You will get a 7-day free trial before the website starts charging.
        </p>
        <div className="subscription-box">
          <div
            className={`option sd ${selectedOption === 'sd' ? 'selected' : ''}`}
            onClick={() => handleOptionSelect('sd')}
          >
            <label htmlFor="sd">SD - €7.99 per month</label>
          </div>
          <div
            className={`option hd ${selectedOption === 'hd' ? 'selected' : ''}`}
            onClick={() => handleOptionSelect('hd')}
          >
            <label htmlFor="hd">HD - €9.99 per month</label>
          </div>
          <div
            className={`option uhd ${selectedOption === 'uhd' ? 'selected' : ''}`}
            onClick={() => handleOptionSelect('uhd')}
          >
            <label htmlFor="uhd">Ultra HD - €13.99 per month</label>
          </div>
          <button className="subscribe-btn">Subscribe</button>
        </div>
        <p className="invite-friend">
          <a href="/">Invite a friend?</a> {/* Link to invite friend page */}
          <span className="discount-note">If your friend joins, you both get a €2 discount!</span>
        </p>
      </div>
    </div>
  );
};

export default SubscriptionPage;
