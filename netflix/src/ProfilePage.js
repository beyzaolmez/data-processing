import React, { useState, useEffect } from 'react';
import './css/ProfilePage.css';

const ProfileSelectionScreen = () => {
  const [profiles] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [inputError, setInputError] = useState('');
  const [submitAttempted, setSubmitAttempted] = useState(false);
  useEffect(() => {}, []);

  const addProfile = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleNameChange = (event) => {
    setProfileName(event.target.value);
    if (submitAttempted) {
      validateInput(event.target.value);
    }
  };

  const validateInput = (value) => {
    if (/^[a-zA-Z0-9]*$/.test(value) && value.length >= 4) {
      setInputError('');
    } else {
      setInputError('Please enter a valid name');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitAttempted(true);
  
    const isValidInput = /^[a-zA-Z0-9]*$/.test(profileName) && profileName.length >= 4;
    if (!isValidInput) {
      setInputError('Please enter a valid name');
      return;
    }
    setInputError('');
  
    try {
      const response = await fetch('/api/addProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: profileName }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      setShowPopup(false);
      setProfileName('');
      setSubmitAttempted(false);
  
    } catch (error) {
      console.error('Error submitting profile:', error);
    }
  };
    
  return (
    <div className="profile-selection-screen">
      <h1 className='profile-title'>Who's watching?</h1>
      <div className="profiles-container" onClick={addProfile}>
        {profiles.length === 0 && (
          <div className="profile add-new" onClick={addProfile}>
            <span className='plus'>+</span>
            <span>Add profile</span>
          </div>
        )}
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h2 className="profile-title">Create a new Profile</h2>
            <form onSubmit={handleSubmit}>
        <p><label className="profile-name" htmlFor="profileName">Name:</label></p>
        <input 
    type="text" 
    id="profileName" 
    name="profileName"
    value={profileName}
    onChange={handleNameChange}
    required
  />
  {submitAttempted && inputError && <div className="input-error">{inputError}</div>}
        <p></p><div className="buttons">
          <input type="submit" value="Submit" className="profile-button-submit" />
            <button className="profile-button-cancel" onClick={handleClosePopup}>Cancel</button>  
            </div>
            </form>
            
          </div>
        </div>
      )}
      <button className="manage-profiles">MANAGE PROFILES</button>
    </div>
  );
};

export default ProfileSelectionScreen;
