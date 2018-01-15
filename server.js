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

app.post('/api/upvote', (req, res) => {
  const requestedTalk = data.talks.find(talk => talk.id === req.body.id)
  const requestedIndex = data.talks.findIndex(talk => talk.id === requestedTalk.id)
  const incrementedRating = {rating: requestedTalk.rating + 1}
  const upvotedTalk = Object.assign({}, requestedTalk, incrementedRating)
  const updatedTalks = [...data.talks]
  updatedTalks[requestedIndex] = upvotedTalk
  const updatedData = {talks: updatedTalks}

  fs.writeFile(dataFilePath, JSON.stringify(updatedData), function (err) {
    if (err) return console.log(err);
  });

  res.send(updatedData);
});

app.post('/api', (req, res) => {
  const newTalk = {
    id: req.body.id,
    title: req.body.title,
    desc: req.body.desc,
    user: req.body.user,
    rating: 0
  }
  const updatedTalks = [...data.talks, newTalk]
  const updatedData = {talks: updatedTalks}

  fs.writeFile(dataFilePath, JSON.stringify(updatedData), function (err) {
    if (err) return console.log(err);
  });

  res.send(updatedData);
});

app.listen(process.env.PORT || 5000);
