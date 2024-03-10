
const axios = require('axios');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Setting up the database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const loginURL = 'http://localhost:8080/login';

const userDetails = {
  email: "testing@gmail.com",
  password: "123456"
};

describe('POST /login', () => {

  beforeAll(async () => {
    // Clean up the test user if it exists
    await new Promise((resolve, reject) => {
      pool.query('DELETE FROM user WHERE user_email = ?', [userDetails.email], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  });

  it('User not found should return 404', async () => {
    try {
      await axios.post(loginURL, userDetails);
    } catch (error) {
      expect(error.response.status).toBe(404);
      expect(error.response.data).toEqual({
        "error": "Email doesn't exist"
      });
    }
  });

  it('register user before the test', async () => {
    // Hash the password
    const hashedPassword = await bcrypt.hash(userDetails.password, 10);
    
    // Insert the user into the database
    await new Promise((resolve, reject) => {
      pool.query('INSERT INTO user (user_email, user_password) VALUES (?, ?)', [userDetails.email, hashedPassword], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  });

  it('Invalid password should return 401', async () => {
    try {
      await axios.post(loginURL, {
        email: userDetails.email,
        password: 'wrongpassword'
      });
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data).toEqual({
        "error": "Invalid credentials"
      });
    }
  });

  it('Successful Login should return 200', async () => {
    const response = await axios.post(loginURL, userDetails);
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      statusCode: 200, 
      success: true, 
      email: userDetails.email
    });
  });

  afterAll(async () => {
    // Clean up the test user
    await new Promise((resolve, reject) => {
      pool.query('DELETE FROM user WHERE user_email = ?', [userDetails.email], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });

    // Close the database connection
    pool.end();
  });
});
