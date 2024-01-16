import React, { useState } from 'react';
import ItemList from './AdminPanel/ItemList';
import AddItemForm from './AdminPanel/AddItemForm';
import DeleteButton from './AdminPanel/DeleteButton';
import VideoControls from './AdminPanel/VideoControls'; // Ensure this path is correct

function App() {
    const [videoFile, setVideoFile] = useState(null);

    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        const videoUrl = URL.createObjectURL(file);
        setVideoFile(videoUrl);
    };

    return (
      <div className="admin-container">
          <AddItemForm />
          {}
          <label htmlFor="video-upload" className="video-upload-button">Upload Video</label>
          <input type="file" accept="video/*" onChange={handleVideoUpload} style={{ display: 'none' }} id="video-upload" />
          <ItemList />
          <DeleteButton />
      </div>
  );
}

export default App;
