import express from 'express';

const router = express.Router();

// TODO: this will be db
const topics = [
  {
    id: 0,
    title: 'foobar',
    description: 'hello',
    rating: 2,
    user: 'taylor',
    date: '2022-01-05T14:07:57.585Z'
  },
  {
    id: 1,
    title: 'foobaz',
    description: 'bye',
    rating: 5,
    user: 'tb',
    date: '2022-01-05T14:27:57.585Z'
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

// router.get('/topics/:topic');

// router.put('/topics/:topic');

module.exports = router;
