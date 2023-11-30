import React, { useState } from 'react';
import './ProfilePage.css'; // Assuming your CSS file is named ProfilePage.css

const Profile = ({ profilePic, name }) => (
  <div className="profile">
    <img src={profilePic} alt={name} />
    <span>{name}</span>
  </div>
);

const ProfileSelectionScreen = () => {
  const [profiles, setProfiles] = useState([]);

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

const express = require('express');
const app = express();
const port = 3000;

// Mock data
let profiles = [];

app.get('/api/profiles', (req, res) => {
  if (profiles.length === 0) {
    return res.json({ createNew: true });
  }
  res.json(profiles);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});