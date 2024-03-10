const db = require('../../db/db').db;

const uploadMovie = async (req, res) => {
    const {title, genreId} = req.body;

    const sql = "INSERT INTO movie (title, genre_id) VALUES (?,?)";

    db.query(sql, [title, genreId], (err, results) => {
        if (err) {
            console.error('MySQL query error:', err);
            reject({ errorCode: 500, message: 'Internal Server Error' });
          } else {
            console.log("Added movie successfully");
            resolve({ statusCode: 200, success:true, message: 'Added movie successfully' });
          }
    });
}

const getMovies = async (req, res) => {
    const sql = "SELECT * FROM moviegenredetails";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('MySQL query error:', err);
            reject({ errorCode: 500, message: 'Internal Server Error' });
        } else {
            return res.json(results);
        }
    });
}

module.exports = {uploadMovie, getMovies};
