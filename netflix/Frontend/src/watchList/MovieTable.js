// MovieTable.js
import React from 'react';

const MovieTable = ({ movies, removeFromTable }) => {
  return (
    <div>
      <h2>All Movies</h2>
      <table>
        <thead>
          <tr>
            <th>Movie Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.name}</td>
              <td>
                <button onClick={() => removeFromTable(movie.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieTable;
