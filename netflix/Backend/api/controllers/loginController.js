const bcrypt = require('bcrypt');
const db = require('../../db/db.js').db;
const xss = require('xss');

const loginUser = async (email, password) => {
  email = xss(email);
  password = xss(password);

  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM user WHERE user_email = ?';
    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error('MySQL query error:', err);
        reject({ errorCode: 500, message: 'Internal Server Error' });
        return;
      }

      if (results.length === 0) {
        reject({ errorCode: 404, message: "Email doesn't exist" });
        return;
      }

      const user = results[0];

      try {
        const passwordMatch = await bcrypt.compare(password, user.user_password);
        if (passwordMatch) {
          resolve({ statusCode: 200, success: true, email });
        } else {
          reject({ errorCode: 401, message: 'Invalid credentials' });
        }
      } catch (compareError) {
        console.error('Error comparing passwords:', compareError);
        reject({ errorCode: 500, message: 'Internal Server Error' });
      }
    });
  });
};

module.exports = { loginUser };
