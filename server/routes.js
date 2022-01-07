import express from 'express';

import {
  selectAllTopics,
  selectSingleTopic,
  insertTopic,
  updateTopicRating
} from './database';

const router = express.Router();

router.get('/topics', (req, res) => {
  selectAllTopics((err, rows) => {
    if (err) throw err.message;
    res.json(rows);
  });
});

router.get('/topics/:topicId', (req, res) => {
  const { topicId } = req.params;

  selectSingleTopic({ id: topicId }, (err, row) => {
    if (err) throw err.message;
    res.json(row);
  });
});

router.post('/topics', (req, res) => {
  const { user, title, description } = req.body;

  insertTopic(
    { user, title, description, rating: 1, date: Date.now() },
    err => {
      if (err) throw err.message;
      res.end();
    }
  );
});

router.put('/topics/:topicId', (req, res) => {
  const { topicId } = req.params;
  const { amount } = req.body;

  updateTopicRating({ id: topicId, rating: amount }, err => {
    if (err) throw err;
    res.end();
  });
});

module.exports = router;
