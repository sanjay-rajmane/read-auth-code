// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static redirect page at /callback
app.get('/callback', (req, res) => {
  res.sendFile(path.join(__dirname, 'callback.html'));
});

app.listen(PORT, () => {
  console.log(`OAuth redirect server running at http://localhost:${PORT}/callback`);
});
