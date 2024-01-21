const bcrypt = require('bcrypt');
const database = require('../../db/db.js').db;
const xss = require('xss');

const loginUser = async (email, password) => {
  email = xss(email);
  password = xss(password);

  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM user WHERE user_email = ?';
    database.query(query, [email], async (err, results) => {
      if (err) {
        console.error('MySQL query error:', err);
        reject({ success: false, message: 'Internal Server Error' });
      }

      if (results.length > 0) {
        const user = results[0];

        try {
          const passwordMatch = await bcrypt.compare(password, user.user_password);

          if (passwordMatch) {
            resolve({ success: true, email});
          } else {
            reject({ success: false, message: 'Invalid credentials' });
          }
        } catch (compareError) {
          console.error('Error comparing passwords:', compareError);
          reject({ success: false, message: 'Internal Server Error' });
        }
      } else {
        reject({ success: false, message: "Email doesn't exist" });
      }
    });
  });
};

module.exports = { loginUser };
