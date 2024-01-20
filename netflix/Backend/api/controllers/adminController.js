const db = require('../../db/db').db;

const uploadMovie = async (req, res) => {
    const {title, genreId} = req.body;

    const sql = "INSERT INTO movie (title, genre_id) VALUES (?,?)";

    db.query(sql, [title, genreId], (err, results) => {
        if (err) {
            console.error('MySQL query error:', err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
          } else {
            console.log("Added movie successfully");
            return res.status(201).json({message: "Added movie successfully"});
          }
    });
}

module.exports = {uploadMovie};