import React, { useState } from 'react';
import ItemList from './AdminPanel/ItemList';
//import AddItemForm from './AdminPanel/AddItemForm';
import DeleteButton from './AdminPanel/DeleteButton';
import VideoControls from './AdminPanel/VideoControls';
import AdminForm from './AdminPanel/AdminForm';

function App() {
    const [videoFile, setVideoFile] = useState(null);
    const [series, setSeries] = useState([]);
    const [seriesTitle, setSeriesTitle] = useState('');
    const [movieDescription, setMovieDescription] = useState('');
    const [seriesDescription, setSeriesDescription] = useState('');
    const [showAdminForm, setShowAdminForm] = useState(false);
    const [adminName, setAdminName] = useState('');
    const [adminEmail, setAdminEmail] = useState('');
    const [movieData, setMovieData] = useState({
    });
    const [seriesData, setSeriesData] = useState({
    });
    const [movieTitle, setMovieTitle] = useState('');
    const [moviePath, setMoviePath] = useState('');
    const [movieGenreId, setMovieGenreId] = useState('');
    const [seriesPath, setsSeriesPath] = useState('');
    const [seriesGenreId, setSeriesGenreId] = useState('');
  const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Comedy' },
    { id: 3, name: 'Drama' },
  ];


    const handleMovieChange = (event) => {
        setMovieData({ ...movieData, [event.target.name]: event.target.value });
    };

    const handleSeriesChange = (event) => {
        setSeriesData({ ...seriesData, [event.target.name]: event.target.value });
    };

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

const handleGenreSelect = (genreId) => {
  setMovieGenreId(genreId);
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
      const movieData = {
        title: movieTitle,
        genreId: movieGenreId, 
      };
  
      const seriesData = {
        title: seriesTitle, 
        genreId: seriesGenreId,
      };
  
      const movieResponse = await fetch('http://localhost:8080/admin/movie/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      });
  
      if (!movieResponse.ok) {
        throw new Error('Error submitting movie data');
      }
  
      const seriesResponse = await fetch('http://localhost:8080/series', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(seriesData),
      });
  
      if (!seriesResponse.ok) {
        throw new Error('Error submitting series data');
      }
  
      window.location.reload();
    } catch (error) {
      console.error('Error submitting data:', error);
    }
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
                        <input type="file" accept="video/*" onChange={handleSeriesChange} style={{ display: 'none' }} id="series-upload" multiple />
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
                        {genres.map((genre) => (
        <div key={genre.id}>
          <input
            type="checkbox"
            id={`genre-${genre.id}`}
            name="genre"
            value={genre.id}
            onChange={() => handleGenreSelect(genre.id)}
          />
          <label htmlFor={`genre-${genre.id}`}>{genre.name}</label>
        </div>
      ))}<p></p>
                        <label>Enter title:</label><p></p>
                        <input
        type="text"
        value={movieTitle}
        onChange={(e) => setMovieTitle(e.target.value)}
        placeholder="Movie Title"
      /><p></p>
                        <label>Enter description:</label><p></p>
                        <textarea placeholder="Movie Description" value={movieDescription} onChange={(e) => setMovieDescription(e.target.value)}></textarea>
                    </>
                )}

                {series.length > 0 && (
                    <>  
                        <h3>Choose genres:</h3>
                        {genres.map((genre) => (
        <div key={genre.id}>
          <input
            type="checkbox"
            id={`genre-${genre.id}`}
            name="genre"
            value={genre.id}
            onChange={() => handleGenreSelect(genre.id)}
          />
          <label htmlFor={`genre-${genre.id}`}>{genre.name}</label>
        </div>
      ))}<p></p>
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
