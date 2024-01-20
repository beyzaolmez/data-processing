const bcrypt = require('bcrypt');
const database = require('../../db/db.js').db;
const xss = require('xss');

const login = (req, res, next) => {
  const { email, password } = req.body;

  email = xss(email);
  password = xss(password);

  const query = 'SELECT * FROM user WHERE user_email = ?';
  database.query(query, [email], async (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

    if (results.length > 0) {
      const user = results[0];

      try {
        const passwordMatch = await bcrypt.compare(password, user.user_password);

        if (passwordMatch) {
          return res.json({ success: true, user });
        } else {
          return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
      } catch (compareError) {
        console.error('Error comparing passwords:', compareError);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    } else {
      return res.status(401).json({ success: false, message: "Email doesn't exist" });
    }
  });
};

module.exports = { login };
