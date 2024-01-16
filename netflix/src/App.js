import React, { useState } from 'react';
import ItemList from './AdminPanel/ItemList';
import AddItemForm from './AdminPanel/AddItemForm';
import DeleteButton from './AdminPanel/DeleteButton';
import VideoControls from './AdminPanel/VideoControls';

function App() {
    const [videoFile, setVideoFile] = useState(null);
    const [series, setSeries] = useState([]);
    const [genres, setGenres] = useState({ action: false, comedy: false, drama: false });

    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        const videoUrl = URL.createObjectURL(file);
        setVideoFile(videoUrl);
    };

    const handleSeriesUpload = (event) => {
      const files = event.target.files;
      const newSeries = Array.from(files).map((file, index) => ({
          episode: series.length + index + 1,
          url: URL.createObjectURL(file)
      }));
  
      setSeries(series.concat(newSeries));
  };
   
  const handleGenreChange = (event) => {
    setGenres({ ...genres, [event.target.name]: event.target.checked });
};

const isAnyGenreSelected = Object.values(genres).some(Boolean);
const isSubmitEnabled = (videoFile || series.length > 0) && isAnyGenreSelected;
  
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
      <AddItemForm/>
      <ItemList />
      <form onSubmit={handleSubmit}>
                {}
                {!videoFile && series.length === 0 && (
                    <>
                        <input type="file" accept="video/*" onChange={handleVideoUpload} style={{ display: 'none' }} id="video-upload" />
                        <label htmlFor="video-upload" className="upload-button">Upload Movies</label>
                    </>
                )}
                {videoFile && <VideoControls videoSrc={videoFile} />}

                {}
                {!videoFile && series.length === 0 && (
                    <>
                        <input type="file" accept="video/*" onChange={handleSeriesUpload} style={{ display: 'none' }} id="series-upload" multiple />
                        <label htmlFor="series-upload" className="upload-button">Upload Series</label>
                    </>
                )}

                {}
                {series.map((video, index) => (
                    <VideoControls key={index} videoSrc={video.url} />
                ))}
                 <h3>Choose genres:</h3>
                <div>
                    <input type="checkbox" id="action" name="action" checked={genres.action} onChange={handleGenreChange} />
                    <label htmlFor="action">Action</label>
                </div>
                <div>
                    <input type="checkbox" id="comedy" name="comedy" checked={genres.comedy} onChange={handleGenreChange} />
                    <label htmlFor="comedy">Comedy</label>
                </div>
                <div>
                    <input type="checkbox" id="drama" name="drama" checked={genres.drama} onChange={handleGenreChange} />
                    <label htmlFor="drama">Drama</label>
                </div>

          <input 
              type="submit" 
              value="Submit" 
              className="submit-button"
              disabled={!isSubmitEnabled}
          />
      </form>
      <DeleteButton onClick={handleDelete} />
  </div>
);
}

export default App;
