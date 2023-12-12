const express = require('express');
const db = require('./dbFiles/db');
const app = express();
const port = 3000; // You can use any available port

app.get('/login', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Failed to fetch users' });
      return;
    }
    res.json({ users: results });
  });
});

app.post('/register', (req, res) => {
  const { username, email } = req.body;
  db.query('INSERT INTO users (username, email) VALUES (?, ?)', [username, email], (err, results) => {
    if (err) {
      console.error('Error adding user:', err);
      res.status(500).json({ error: 'Failed to add user' });
      return;
    }
    res.json({ message: 'User added successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
