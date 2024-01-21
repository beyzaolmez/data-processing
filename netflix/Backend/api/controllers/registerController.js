const bcrypt = require('bcrypt');
const db = require('../../db/db.js').db;
const tokenService = require('../services/tokenService.js');
const xss = require('xss');

const hashPassword = async (plainPassword) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
};

const registerUser = async (req) => {
  let { email, password } = req.body;

  email = xss(email);
  password = xss(password);

  if (!email.endsWith('@gmail.com')) {
    return { error: 'Invalid email domain. Only @gmail.com is allowed.' };
  }

  try {
    const hashedPassword = await hashPassword(password);

    const verificationToken = tokenService.generateToken();

    const insertQuery = 'INSERT INTO user (user_email, user_password, auth_token, subscription_id, payment_method) VALUES (?, ?, ?, ?, ?)';
      
    const queryResult = await new Promise((resolve, reject) => {
      db.query(insertQuery, [email, hashedPassword, verificationToken, 1, 'Card'], (queryErr, results) => {
        if (queryErr) {
          console.error('Error executing query:', queryErr);
          reject({ error: 'Internal Server Error' });
        } else {
          console.log('User registered successfully');
          resolve({ message: 'User registered successfully' });
        }
      });
    });

    return queryResult;
  } catch (error) {
    console.error('Error during registration:', error);
    return { error: 'Internal Server Error' };
  }
};

module.exports = { registerUser };