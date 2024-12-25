// server.js
const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the "public" folder
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello from the development server!');
});

app.listen(port, () => {
  console.log(`Development server running at http://localhost:${port}`);
});