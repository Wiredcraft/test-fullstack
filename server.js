const express = require('express');
const app = express();
const dataFilePath = './data/data.json';
const data = require(dataFilePath);
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.json());

app.get('/api/talks', (req, res) => {
  res.send(data);
});

app.post('/api', (req, res) => {
  const newTalk = {
    id: 2,
    title: req.body.title,
    desc: req.body.desc,
    user: req.body.user,
    rating: 0
  }
  const updatedTalks = [...data.talks, newTalk]
  const updatedData = {talks: updatedTalks}

  fs.writeFile(dataFilePath, JSON.stringify(updatedData), function (err) {
    if (err) return console.log(err);
    console.log(JSON.stringify(file));
    console.log('writing to ' + fileName);
  });

  res.send(updatedData);
});



app.listen(process.env.PORT || 5000);
