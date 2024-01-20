const express = require('express');

const cors = require('cors');

const indexRoute = require('./api/routes/index.js');
const registerRoute = require('./api/routes/register.js');
const loginRoute = require('./api/routes/login.js');
const adminRoute = require('./api/routes/admin.js');
const usersRoute = require('./api/routes/users.js');

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.set('view engine', 'ejs');

// Uses routes for the endpoints
app.use('/index', indexRoute);
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/admin', adminRoute);
app.use('/users', usersRoute);

app.get('/', (req, res) => {
  res.send('Working');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});