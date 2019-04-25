require('dotenv').config();

const { sumVotes } = require('./utils');

const { db, writeTalk, addVote, auth } = require('./db');

const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.use((req, res, next) => {
  res.setTimeout(10000, () => {
    console.log('Request timed out.');
    res.sendStatus(408);
  });

  next();
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(bodyParser.json());

app.get('/talks', async (req, res) => {
  const query = db.ref('talks');

  const snapshot = await query.once('value');

  const talks = snapshot.val();

  Object.keys(talks).forEach(key => talks[key].votes = sumVotes(talks[key].votes));

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



app.use(async (req, res, next) => {
  if (req.method === 'OPTIONS') return next();

  const authHeader = req.header('Authorization');

  const m = authHeader && authHeader.match(/Bearer (.+)/);

  if (!m) {
    return res.sendStatus(401);
  }

  try {
    const idToken = m[1];
    const decodedToken = await auth(idToken);

    req.userId = decodedToken.user_id;

    return next();
  } catch(e) {
    return res.sendStatus(401);
  }
});

app.post('/talks', (req, res) => {
  const { title, abstract } = req.body;

  if (title.length > 50 || abstract.length > 250) {
    return res.sendStatus(400);
  }

  const userId = req.userId;

  const talk = { title, abstract, userId };

  writeTalk(talk);

  res.json(talk);
});

app.post('/talks/:id/:vote', async (req, res) => {
  const vals = {
    upvote: +1,
    downvote: -1
  };

  const val = vals[req.params.vote];

  if (!val) {
    return res.sendStatus(400);
  }

  const userId = req.userId;

  const talkId = req.params.id;

  const newVal = await addVote({ userId, talkId, val });

  res.json({ newVal })
});

app.listen(process.env.PORT);
console.log(`Listening on port ${process.env.PORT}...`);
