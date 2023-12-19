import React, { useState } from 'react';
import './css/ProfilePage.css';
import netflixLogo from './Images/Netflix.png';
import ProfileElephant from './profile-images/Profile-elephant.png';
import ProfileFox from './profile-images/Profile-fox.png';
import ProfileGiraffe from './profile-images/Profile-giraffe.png';
import ProfileMonster from './profile-images/Profile-monster.png';
import ProfilePenguin from './profile-images/Profile-pinguin.png';
import ProfileTurtle from './profile-images/Profile-turtle.png';

const ProfileSelectionScreen = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [profileType, setProfileType] = useState('');
  const [nameError, setNameError] = useState('');
  const [typeError, setTypeError] = useState('');
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [fadeError, setFadeError] = useState(false);
  const [showPicturePopup, setShowPicturePopup] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState(null);
  
  const profileImages = [
    ProfileElephant,
    ProfileFox,
    ProfileGiraffe,
    ProfileMonster,
    ProfilePenguin,
    ProfileTurtle
  ];
  
  const addProfile = () => {
    setShowPopup(true);
  };

  const handleCheckboxChange = (event) => {
    setProfileType(event.target.value);
    if (submitAttempted) {
      validateProfileType();
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setProfileName('');
    setProfileType('');
    setNameError('');
    setTypeError('');
    setSubmitAttempted(false);
  };

  const handleNameChange = (event) => {
    setProfileName(event.target.value);
    if (submitAttempted) {
      validateInput(event.target.value);
    }
  };

  const validateInput = (value) => {
    if (!/^[a-zA-Z0-9]*$/.test(value) || value.length < 4 || value.length > 16) {
      setNameError('Please enter a valid name (4-16 characters long)');
      return false;
    } else {
      setNameError('');
      return true;
    }
  };

  const validateProfileType = () => {
    if (!profileType) {
      setTypeError('Please choose a profile type');
      return false;
    } else {
      setTypeError('');
      return true;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitAttempted(true);

    const isNameValid = validateInput(profileName);
    const isTypeValid = validateProfileType();

    if (!isNameValid) {
      setFadeError(true);
      setTimeout(() => {
        setNameError('');
        setFadeError(false); 
      }, 3000); 
    }

    if (!isTypeValid) {
      setFadeError(true);
      setTimeout(() => {
        setTypeError('');
        setFadeError(false);
      }, 3000); 
    }

    try {
      const response = await fetch('/api/addProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: profileName, type: profileType }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      handleClosePopup(); 
    } catch (error) {
      console.error('Error submitting profile:', error);
    }
  };

  const handleChoosePictureClick = () => {
      setShowPopup(false); 
      setShowPicturePopup(true); 
    };
    
    const renderPicturePopup = () => {
      const handleImageSelect = (image) => {
        setSelectedPicture(image);
        setShowPicturePopup(false);
        setShowPopup(true);
      };

    <div className="profile-pictures">
  {profileImages.map((image, index) => (
    <img
      key={index}
      src={image}
      alt={`Profile ${index}`}
      className="profile-picture"
      onDoubleClick={() => handleImageSelect(image)}
    />
  ))}
</div>
 
return (
  <div className="popup">
    <div className="popup-inner">
      <h2 className="profile-title">Choose a Picture</h2>
      <div className="profile-pictures">
        {profileImages.map((image, index) => (
           <img
           key={index}
           src={image}
           alt={`Profile ${index}`}
           className="profile-picture"
           onDoubleClick={() => handleImageSelect(image)}
         />
        ))}
      </div>
      <button className="avatar-close-button" onClick={() => setShowPicturePopup(false)}>Close</button>
    </div>
  </div>
);
};
 
  return (
    <div className="profile-selection-screen">
      <img src={netflixLogo} alt="Netflix Logo" className="netflix-logo" />
      <h1 className='profile-title'>Who's watching?</h1>
      <div className="profiles-container" onClick={addProfile}>
        <div className="profile add-new" onClick={addProfile}>
          <span className='plus'>+</span>
          <span>Add profile</span>
        </div>
      </div>
      {showPicturePopup && renderPicturePopup()}
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
            />
             {submitAttempted && nameError && (
  <div className={`input-error ${fadeError ? 'input-error-fade' : ''}`}>
    {nameError}
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
{submitAttempted && typeError && (
  <div className={`input-error ${fadeError ? 'input-error-fade' : ''}`}>
    {typeError}
  </div>
)}
<p></p>
{selectedPicture && (
            <div className="selected-picture-container">
              <img src={selectedPicture} alt="Selected Profile" className="selected-picture" />
            </div>
          )}
{!selectedPicture && (
                <input
                  type="button"
                  value="Choose a picture"
                  className="picture-profile"
                  onClick={handleChoosePictureClick}
                />
              )}
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
