import React, { useState, useEffect } from 'react';
import './css/ProfilePage.css';

const Profile = ({ profilePic, name }) => (
  <div className="profile">
    <img src={profilePic} alt={name} />
    <span>{name}</span>
  </div>
);

const ProfileSelectionScreen = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    // Fetch profiles from your server
    fetch('/api/profiles')
      .then(response => response.json())
      .then(data => {
        if (data.createNew) {
          // Handle the case when there are no profiles
        } else {
          setProfiles(data);
        }
      });
  }, []);

  const addProfile = () => {
    // Placeholder for functionality to add a profile
    // This will be replaced with actual implementation when profile creation is available
  };

  return (
    <div className="profile-selection-screen">
      <h1>Who's watching?</h1>
      <div className="profiles-container">
        {profiles.length === 0 && (
          <div className="profile add-new" onClick={addProfile}>
            <span>+</span>
            <span>Add profile</span>
          </div>
        )}
        {profiles.map((profile, index) => (
          <Profile key={index} profilePic={profile.pic} name={profile.name} />
        ))}
      </div>
      <button className="manage-profiles">MANAGE PROFILES</button>
    </div>
  );
};

export default ProfileSelectionScreen;
