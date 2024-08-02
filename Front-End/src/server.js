// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/login', (req, res) => {
  // Handle login logic here
  res.json({ token: 'dummy-token' });
});

app.post('/register', (req, res) => {
  // Handle registration logic here
  res.json({ message: 'User registered successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});