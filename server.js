const express = require('express');
const app = express();

app.get('/api/message', (req, res) => {
  res.send({ message: 'Up and running' });
});

app.listen(process.env.PORT || 5000);
