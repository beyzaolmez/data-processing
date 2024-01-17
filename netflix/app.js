const express = require('express');
const indexRoute = require('./src/api/routes/index.js');
const registerRoute = require('./src/api/routes/register.js');
const loginRoute = require('./src/api/routes/login.js');

const database = require('./src/db/db.js').db;

const app = express();
const port = 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(express.json());

// Uses routes for the endpoints
app.use('/index', indexRoute);
app.use('/register', registerRoute);
app.use('/login', loginRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});