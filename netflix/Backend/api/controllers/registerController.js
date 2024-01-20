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

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  email = xss(email);
  password = xss(password);

  if (!email.endsWith('@gmail.com')) {
    return res.status(400).json({ message: 'Invalid email domain. Only @gmail.com is allowed.' });
  }

  try {
    const hashedPassword = await hashPassword(password);

    const verificationToken = tokenService.generateToken();

    const insertQuery = 'INSERT INTO user (user_email, user_password, auth_token, subscription_id, payment_method) VALUES (?, ?, ?, ?, ?)';
      
    db.query(insertQuery, [email, hashedPassword, verificationToken, 1, 'Card'], (queryErr, results) => {
      if (queryErr) {
        console.error('Error executing query:', queryErr);

        // Handle the content negotiation
        const contentType = req.headers['accept'] || 'application/json';

        if (contentType.includes('xml')) {
          const xmlResponse = `<response><error>Error executing query</error></response>`;
          res.status(500).type('application/xml').send(xmlResponse);
        } else {
          res.status(500).json({ error: 'Internal Server Error' });
        }
        return;
      }

      console.log('User registered successfully');

      const contentType = req.headers['accept'] || 'application/json';

      if (contentType.includes('xml')) {
        const xmlResponse = `<response><message>User registered successfully</message></response>`;
        res.status(201).type('application/xml').send(xmlResponse);
      } else {
        res.status(201).json({ message: 'User registered successfully' });
      }
    });
  } catch (error) {
    console.error('Error during registration:', error);

    const contentType = req.headers['accept'] || 'application/json';

    if (contentType.includes('xml')) {
      const xmlResponse = `<response><error>Error during registration</error></response>`;
      res.status(500).type('application/xml').send(xmlResponse);
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = { registerUser };