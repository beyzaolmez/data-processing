const express = require('express');
const db = require('../db/db');
const router = express.Router();

router.use(express.json);

router.get('/login', (req, res) => {
  db.query('SELECT * FROM user', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Failed to fetch users' });
      return;
    }
    res.json({ users: results });
  });
});

router.post('/register', (req, res) => {
  const { email, password } = req.body;
  db.query('INSERT INTO user (user_email, user_password) VALUES (?, ?)', [ email, password], (err, results) => {
    if (err) {
      console.error('Error adding user:', err);
      res.status(500).json({ error: 'Failed to add user' });
      return;
    }
    res.json({ message: 'User added successfully' });
  });
});

router.post('/subscribe', (req, res) => {
  const { subscriptionType } = req.body; // Assuming subscriptionType is submitted via the form

  // Perform the database query to insert the subscription
  db.query('INSERT INTO subscription (description) VALUES (?)', [subscriptionType], (err, results) => {
    if (err) {
      console.error('Error adding subscription:', err);
      res.status(500).json({ error: 'Failed to add subscription' });
      return;
    }
    res.json({ message: 'Subscription added successfully' });
  });
});

module.exports = router;