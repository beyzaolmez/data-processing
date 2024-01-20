// WatchListPage.js
import React, { useEffect, useState } from 'react';
import MovieComponent from './MovieComponent';

const WatchListPage = ({ userId }) => {
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    // Fetch user's watch-list data from the backend API
    fetchWatchListData(userId)
      .then((data) => setWatchList(data))
      .catch((error) => console.error('Error fetching watch list:', error));
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

  const fetchWatchListData = async (userId) => {
    // Example: Fetch watch list data from the backend API
    const response = await fetch(`/api/watchlist/${userId}`);
    const data = await response.json();
    return data;
  };

  const removeMovieFromWatchList = async (userId, movieId) => {
    // Example: Remove movie from watch list in the backend API
    const response = await fetch(`/api/watchlist/${userId}/remove/${movieId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to remove movie from watch list');
    }
  };

  return (
    <div>
      <h2>My Watch List</h2>
      <table>
        <thead>
          <tr>
            <th>Movie Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {watchList.map((movie) => (
            <MovieComponent
              key={movie.id}
              movie={movie}
              removeFromWatchList={removeFromWatchList}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WatchListPage;
