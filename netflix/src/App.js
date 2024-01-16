import React, { useState } from 'react';
import ItemList from './AdminPanel/ItemList';
import AddItemForm from './AdminPanel/AddItemForm';
import DeleteButton from './AdminPanel/DeleteButton';
import VideoControls from './AdminPanel/VideoControls';

function App() {
    const [videoFile, setVideoFile] = useState(null);
    const [series, setSeries] = useState([]);

    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        const videoUrl = URL.createObjectURL(file);
        setVideoFile(videoUrl);
    };

    const handleSeriesUpload = (event) => {
      const file = event.target.files[0];
      const videoUrl = URL.createObjectURL(file);
      setSeries([...series, { episode: series.length + 1, url: videoUrl }]);
  };

  const handleDelete = () => {
    window.location.reload();
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        await fetch('http://your-backend-url/api/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ videoFile, series })
        });
        setVideoFile(null);
        setSeries([]);
        
    } catch (error) {
        console.error('Submission error:', error);
    }
    window.location.reload();
};


return (
  <div className="admin-container">
      <AddItemForm />
      <ItemList />
      <form onSubmit={handleSubmit}>
          {}
          <input type="file" accept="video/*" onChange={handleVideoUpload} style={{ display: 'none' }} id="video-upload" />
          <label htmlFor="video-upload" className="upload-button">Upload Video</label>
          {videoFile && <VideoControls videoSrc={videoFile} />}

          {}
          <input type="file" accept="video/*" onChange={handleSeriesUpload} style={{ display: 'none' }} id="series-upload" multiple />
          <label htmlFor="series-upload" className="upload-button">Upload Series</label>
          {}

          {}
          <input 
              type="submit" 
              value="Submit" 
              className="submit-button"
              disabled={!videoFile && series.length === 0}
          />
      </form>
      <DeleteButton onClick={handleDelete} />
  </div>
);
}

export default App;
