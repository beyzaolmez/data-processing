const database = require('../../db/db.js').db;

const login = (req, res, next) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM user WHERE user_email = ? AND user_password = ?';
  database.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        const user = results[0];
        res.json({ success: true, user });
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    }
  });
};

module.exports = {login};