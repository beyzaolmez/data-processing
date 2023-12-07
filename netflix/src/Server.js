const express = require('express');
const app = express();
const port = 3000;

// Mock data
let profiles = [];

app.get('/api/profiles', (req, res) => {
  if (profiles.length === 0) {
    return res.json({ createNew: true });
  }
  res.json(profiles);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
