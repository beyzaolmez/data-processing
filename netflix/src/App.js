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

    return (
      <div className="admin-container">
          <AddItemForm />
          {}
          {/* Video Upload */}
          <input type="file" accept="video/*" onChange={handleVideoUpload} style={{ display: 'none' }} id="video-upload" />
            <label htmlFor="video-upload" className="upload-button">Upload Video</label>
            {videoFile && <VideoControls videoSrc={videoFile} />}

            {/* Series Upload */}
            <input type="file" accept="video/*" onChange={handleSeriesUpload} style={{ display: 'none' }} id="series-upload" multiple />
            <label htmlFor="series-upload" className="upload-button">Upload Series</label>
            {series.map((item, index) => (
                <div key={index}>Episode {item.episode}: <VideoControls videoSrc={item.url} /></div>
            ))}
          <ItemList />
          <DeleteButton />
      </div>
  );
}

export default App;
