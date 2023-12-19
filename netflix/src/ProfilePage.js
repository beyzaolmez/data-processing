import React, { useState } from 'react';
import './css/ProfilePage.css';

const ProfileSelectionScreen = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [profileType, setProfileType] = useState('');
  const [inputError, setInputError] = useState('');
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [showError, setShowError] = useState(false);


  const addProfile = () => {
    setShowPopup(true);
  };

  const handleCheckboxChange = (event) => {
    setProfileType(event.target.value);
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
    return /^[a-zA-Z0-9]*$/.test(value) && value.length >= 4 && value.length <= 16;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitAttempted(true);

    setShowError(false);
  
    if (!validateInput(profileName)) {
      setInputError('Please enter a valid name (4-16 characters long)');
      setShowError(true);
      setTimeout(() => setShowError(false), 2000); 
    } else if (!profileType) {
      setInputError('Please choose a profile type');
      setShowError(true);
      setTimeout(() => setShowError(false), 2000); 
    } else {
      setInputError('');}

    try {
      const response = await fetch('/api/addProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: profileName }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setShowPopup(false);
      setProfileName('');
      setProfileType('');
      setSubmitAttempted(false);
    } catch (error) {
      console.error('Error submitting profile:', error);
    }
  };
  
  return (
    <div className="profile-selection-screen">
      <h1 className='profile-title'>Who's watching?</h1>
      <div className="profiles-container" onClick={addProfile}>
        <div className="profile add-new" onClick={addProfile}>
          <span className='plus'>+</span>
          <span>Add profile</span>
        </div>
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
  placeholder="Enter name here..."
  required
/>
{submitAttempted && inputError && (
  <div className={`input-error ${!showError ? 'input-error-fade' : ''}`}>
    {inputError}
  </div>
)}
  <p></p><label className="radio-profile-kid">
  <input
    className="input-checkbox"
    type="radio"
    value="Kid"
    name="profileType"
    checked={profileType === 'Kid'}
    onChange={handleCheckboxChange}
  />
  Kid
</label>
<label className="radio-profile-adult">
  <input 
    className="input-checkbox"
    type="radio"
    value="Adult"
    name="profileType"
    checked={profileType === 'Adult'}
    onChange={handleCheckboxChange}
  />
  Adult
</label>

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
