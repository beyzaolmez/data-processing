import React, { useState, useEffect } from 'react';
import '../css/HomePage.css';

const HomePage = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/movies/getmovies')
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    return (
        <div className="movies-container">
            {movies.map(movie => (
                <div key={movie.id} className="movie">
                    <img src={movie.imageUrl} alt={movie.title} style={{ height: '200px', width: '400px' }} />
                    {}
                </div>
            ))}
        </div>
    );
};

export default HomePage;
