const express = require('express');

const cors = require('cors');

const indexRoute = require('./src/api/routes/index.js');
const registerRoute = require('./src/api/routes/register.js');
const loginRoute = require('./src/api/routes/login.js');

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.set('view engine', 'ejs');

// Uses routes for the endpoints
app.use('/index', indexRoute);
app.use('/register', registerRoute);
app.use('/login', loginRoute);

app.get('/', (req, res) => {
  res.send('Working');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});