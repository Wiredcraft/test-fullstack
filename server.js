const express = require('express');
const app = express();
const data = require('./data/data.json')

app.get('/api/talks', (req, res) => {
  res.send(data);
});

app.listen(process.env.PORT || 5000);
