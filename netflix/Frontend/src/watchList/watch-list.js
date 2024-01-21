// WatchListPage.js
import React, { useEffect, useState } from 'react';
import MovieComponent from './MovieComponent';
import MovieTable from './MovieTable';
import './css/AccountPage.css';

const WatchListPage = ({ userId }) => {
  const [watchList, setWatchList] = useState([]);
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    // Fetch user's watch-list data from the backend API
    fetchWatchListData(userId)
      .then((data) => setWatchList(data))
      .catch((error) => console.error('Error fetching watch list:', error));

    // Fetch all movies data from the backend API
    fetchAllMoviesData()
      .then((data) => setAllMovies(data))
      .catch((error) => console.error('Error fetching all movies:', error));
  }, [userId]);

  const removeFromWatchList = (movieId) => {
    // Make a request to the backend API to remove the selected movie from the watch-list
    removeMovieFromWatchList(userId, movieId)
      .then(() => {
        // After successfully removing, fetch the updated watch list and update state
        fetchWatchListData(userId)
          .then((data) => setWatchList(data))
          .catch((error) => console.error('Error fetching updated watch list:', error));
      })
      .catch((error) => console.error('Error removing movie from watch list:', error));
  };

  const removeFromAllMovies = (movieId) => {
    // Make a request to the backend API to remove the selected movie from all movies
    removeMovieFromAllMovies(movieId)
      .then(() => {
        // After successfully removing, fetch the updated all movies data and update state
        fetchAllMoviesData()
          .then((data) => setAllMovies(data))
          .catch((error) => console.error('Error fetching updated all movies:', error));
      })
      .catch((error) => console.error('Error removing movie from all movies:', error));
  };

  const fetchAllMoviesData = async () => {
    // Example: Fetch all movies data from the backend API
    const response = await fetch('/api/allmovies');
    const data = await response.json();
    return data;
  };

  const removeMovieFromAllMovies = async (movieId) => {
    // Example: Remove movie from all movies in the backend API
    const response = await fetch(`/api/allmovies/remove/${movieId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to remove movie from all movies');
    }
  };

  return (
    <div>
      <WatchListTable watchList={watchList} removeFromWatchList={removeFromWatchList} />
      <MovieTable movies={allMovies} removeFromTable={removeFromAllMovies} />
    </div>
  );
};

export default WatchListPage;
