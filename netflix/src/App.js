import React, { useState } from 'react';
import ItemList from './AdminPanel/ItemList';
//import AddItemForm from './AdminPanel/AddItemForm';
import DeleteButton from './AdminPanel/DeleteButton';
import VideoControls from './AdminPanel/VideoControls';
import AdminForm from './AdminPanel/AdminForm';

function App() {
    const [videoFile, setVideoFile] = useState(null);
    const [series, setSeries] = useState([]);
    const [genres, setGenres] = useState({ action: false, comedy: false, drama: false });
    const [movieTitle, setMovieTitle] = useState('');
    const [seriesTitle, setSeriesTitle] = useState('');
    const [movieDescription, setMovieDescription] = useState('');
    const [seriesDescription, setSeriesDescription] = useState('');
    const [showAdminForm, setShowAdminForm] = useState(false);
    const [adminName, setAdminName] = useState('');
    const [adminEmail, setAdminEmail] = useState('');

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
  
  const handleBack = () => {
    window.location.reload();
};

  const handleGenreChange = (event) => {
    setGenres({ ...genres, [event.target.name]: event.target.checked });
};

  const isAnyGenreSelected = Object.values(genres).some(Boolean);
    const isSubmitEnabled = (videoFile || series.length > 0) && isAnyGenreSelected && 
                            ((videoFile && movieTitle && movieDescription) || 
                             (series.length > 0 && seriesTitle && seriesDescription));
  const handleDelete = () => {
    window.location.reload();
};

const toggleAdminFormVisibility = () => {
  setShowAdminForm(!showAdminForm);
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

const handleAdminSubmit = async () => {
  setShowAdminForm(false);
  window.location.reload();
};

return (
  <div className="admin-container">
       <button className="back-button" onClick={handleBack}>Home</button>
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

                {videoFile && (
                    <>
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
                </div><p></p>
                        <label>Enter title:</label><p></p>
                        <input type="text" placeholder="Movie Title" value={movieTitle} onChange={(e) => setMovieTitle(e.target.value)} /><p></p>
                        <label>Enter description:</label><p></p>
                        <textarea placeholder="Movie Description" value={movieDescription} onChange={(e) => setMovieDescription(e.target.value)}></textarea>
                    </>
                )}

                {series.length > 0 && (
                    <>  
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
                </div><p></p>
                        <label>Enter title:</label><p></p>
                        <input type="text" placeholder="Series Title" value={seriesTitle} onChange={(e) => setSeriesTitle(e.target.value)} /><p></p>
                        <label>Enter description:</label><p></p>
                        <textarea placeholder="Series Description" value={seriesDescription} onChange={(e) => setSeriesDescription(e.target.value)}></textarea>
                    </>
                )}


          <input 
              type="submit" 
              value="Submit" 
              className="submit-button"
              disabled={!isSubmitEnabled}
          />
      </form>
      <DeleteButton onClick={handleDelete} />
      <div className="admin-container">
            {!showAdminForm && (
                <button onClick={toggleAdminFormVisibility}>Create a New Admin</button>
            )}
            {showAdminForm && (
                <AdminForm onSubmit={handleAdminSubmit} />
            )}
            {}
        </div>
  </div>
);
}

export default App;
