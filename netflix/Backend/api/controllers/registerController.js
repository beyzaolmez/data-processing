const bcrypt = require('bcrypt');
const db = require('../../db/db.js').db;

const hashPassword = async (plainPassword) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error; // Rethrow the error to be caught in the calling function
  }
};

// Controller function to register a new user
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Hash the password before storing it in the database
    const hashedPassword = await hashPassword(password);

    // Insert query
    const insertQuery = 'INSERT INTO user (user_email, user_password, is_activated, subscription_id, payment_method) VALUES (?, ?, ?, ?, ?)';
    db.query(
      insertQuery,
      [email, hashedPassword, null, 1, "Card"],
      (queryErr, results) => {
        if (queryErr) {
          console.error('Error executing query:', queryErr);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        console.log('User registered successfully');
        return res.status(201).json({ message: 'User registered successfully' });
      }
    );
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const displayRegiser = async (req, res) => {
    res.send('Register API');
}

module.exports = {registerUser, displayRegiser};