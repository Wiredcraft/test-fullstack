require('dotenv').config();

const config = require('./config');

const { db, writeTalk } = require('./db');

const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/talks', async (req, res) => {
  const limit = +req.query.limit || config.DEFAULT_PAGE_LENGTH;
  const after = +req.query.after || 0;

  const query = db.ref('talks')
    // .orderByChild('createdAt')
    // .limitToFirst(limit)
    // .startAt(after + 1);

  const snapshot = await query.once('value');

  const talks = snapshot.val();

  res.json({
    talks
  });
});

app.get('/talks/:id', async (req, res) => {
  const query = db.ref('talks/' + req.params.id);

  const snapshot = await query.once('value');

  const talk = snapshot.val();
  res.json(talk);
});

app.post('/talks', async (req, res) => {
  // const { title, abstract } = req.body;
  // const userId = '';
  // writeTalk({ title, abstract, userId });
  // res.sendCode(200);
});

app.post('/talks/:id/upvote', async (req, res) => {

});

app.post('/talks/:id/downvote', async (req, res) => {

});


app.listen(process.env.PORT);
console.log(`Listening on port ${process.env.PORT}...`);
