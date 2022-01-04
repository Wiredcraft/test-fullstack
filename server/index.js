/* eslint-disable no-undef */
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.port || 3000;

app.use(express.static(path.resolve(__dirname, '..', 'dist')));

app.get('/api', (req, res) => {
  res.json({ foo: 'bar' });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log('Server listening on port', PORT);
});
