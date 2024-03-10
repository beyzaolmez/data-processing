
const axios = require('axios');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
require('dotenv').config();

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
        "message": "Email doesn't exist"
      });
    }
  });

  it('register user before the test', async () => {
    const hashedPassword = await bcrypt.hash(userDetails.password, 10);
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
        "message": "Invalid credentials"
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
    await new Promise((resolve, reject) => {
      pool.query('DELETE FROM user WHERE user_email = ?', [userDetails.email], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });

    pool.end();
  });
});
