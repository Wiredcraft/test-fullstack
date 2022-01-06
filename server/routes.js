import express from 'express';

const router = express.Router();

// TODO: this will be db
const topics = [
  {
    id: 0,
    title: 'How to do computer stuff',
    description: 'This is a great talk about computers',
    rating: 2,
    user: 'taylor',
    date: '2022-01-05T14:07:57.585Z'
  },
  {
    id: 1,
    title: 'What is the nature of computers?',
    description: 'What are they really?',
    rating: 5,
    user: 'Taylor James Brennan',
    date: '2022-01-05T14:27:57.585Z'
  },
  {
    id: 2,
    title: 'Stopping by Woods on a Snowy Evening',
    description: `Whose woods these are I think I know.   
      His house is in the village though;   
      He will not see me stopping here   
      To watch his woods fill up with snow.   

      My little horse must think it queer   
      To stop without a farmhouse near   
      Between the woods and frozen lake   
      The darkest evening of the year.   

      He gives his harness bells a shake   
      To ask if there is some mistake.   
      The only other sound’s the sweep   
      Of easy wind and downy flake.   

      The woods are lovely, dark and deep,   
      But I have promises to keep,   
      And miles to go before I sleep,   
      And miles to go before I sleep.`,
    user: 'Robert Frost',
    rating: 10,
    date: '2022-01-06T14:27:57.585Z'
  }
];

router.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

router.get('/topics', (req, res) => {
  res.json(topics);
});

router.get('/topics/:topicId', (req, res) => {
  res.json(topics[req.params.topicId]);
});

router.post('/topics', (req, res) => {
  console.log(req.body);
  res.end();
});

router.put('/topics/:topicId', (req, res) => {
  const rating = topics[req.params.topicId].rating;
  if (rating + req.body.amount < 0) {
    topics[req.params.topicId].rating = 0;
  } else {
    topics[req.params.topicId].rating = rating + req.body.amount;
  }
  res.end();
});

// router.get('/topics/:topic');

// router.put('/topics/:topic');

module.exports = router;
