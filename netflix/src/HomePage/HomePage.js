import React, { useState, useEffect } from 'react';
import '../css/HomePage.css';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]); 

    useEffect(() => {
        fetch('http://localhost:8080/movies/getmovies')
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => console.error('Error fetching movies:', error));
            fetch('http://localhost:8080/movies/getseries')
            .then(response => response.json())
            .then(data => setSeries(data))
            .catch(error => console.error('Error fetching series:', error));
    }, []);

    

    const handleAccountSettingsClick = () => {
        console.log('Navigate to Account Settings page');
    };

    return (
        <div className="homepage">
            <div className="account-settings-container">
                <button className="account-settings-button" onClick={handleAccountSettingsClick}>
                    Account Settings
                </button>
            </div>
            <div className="movies-container">
                {movies.map(movie => (
                    <div key={movie.id} className="movie">
                        <img src={movie.imageUrl} alt={movie.title} style={{ height: '200px', width: '400px' }} />
                    </div>
                ))}
            </div>
            <div className="series-container">
                {series.map(serie => (
                    <div key={serie.id} className="serie">
                        {}
                        <img src={serie.seasons[0].episodes[0].imageUrl} alt={serie.title} style={{ height: '200px', width: '400px' }} />
                        {}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
