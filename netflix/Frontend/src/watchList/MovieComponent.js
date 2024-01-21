// MovieComponent.js
import React from 'react';

const MovieComponent = ({ movie, removeFromWatchList }) => {
  const handleRemoveClick = () => {
    // Call the removeFromWatchList function with the movie ID
    removeFromWatchList(movie.id);
  };

  return (
    <tr>
      <td>{movie.name}</td>
      <td>
        <button onClick={handleRemoveClick}>Remove</button>
      </td>
    </tr>
  );
};

export default MovieComponent;
