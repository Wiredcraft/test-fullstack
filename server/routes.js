import express from 'express';

const router = express.Router();
// TODO: this will be db
const topics = [];

router.get('/topics', (req, res) => {
  res.json(topics);
});

router.get('/topics/:topicId', (req, res) => {
  const { topicId } = req.params;
  res.json(topics[topicId]);
});

router.post('/topics', (req, res) => {
  const { user, title, description } = req.body;
  topics.push({
    id: topics.length,
    user,
    title,
    description,
    rating: 1,
    date: Date.now()
  });
  res.end();
});

router.put('/topics/:topicId', (req, res) => {
  const { topicId } = req.params;
  const { amount } = req.body;
  const rating = topics[topicId].rating;

  if (rating + req.body.amount < 0) {
    topics[topicId].rating = 0;
  } else {
    topics[topicId].rating = rating + amount;
  }
  res.end();
});

module.exports = router;
