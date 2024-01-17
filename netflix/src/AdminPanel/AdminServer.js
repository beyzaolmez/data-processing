import './css/AdminPanel.css';
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/items', (req, res) => {
    const query = 'SELECT * FROM items';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/items', (req, res) => {
    const newItem = req.body;
    const query = 'INSERT INTO items SET ?';
    db.query(query, newItem, (err, result) => {
        if (err) throw err;
        res.send('Item added');
    });
});

app.delete('/items/:id', (req, res) => {
    const query = 'DELETE FROM items WHERE id = ?';
    db.query(query, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send('Item deleted');
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});