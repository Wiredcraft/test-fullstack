let mongoose = require('mongoose');
let mongoSchema = require('../config/mongoSchema');
let Topic = mongoSchema.Topic;

let express = require('express');
let router = express.Router();
let validateToken = require('./checkAuth').validateToken;

router.get('/:id?', (req, res) => { // if you omit the ?, only /topic/123 would match, /topic wouldn't
  let topicID = req.params.id;
  if (topicID){ // if the result returned is sorted, then client side no need to do the sorting.
    let query = Topic.find({ancestorId: topicID}).select("-__v");
    query.exec((err, topic) => {
      if (err){
        console.log('err getting topic: ', err);
        return res.status(500).json({
          message: "err getting topic, please retry later"
        })
      }
      res.status(200).json(topic)
    });
    return
  }

    Topic.find({rootTopic: true}).sort({points: 'descending'}).exec((err, topics) => {
      if (err){
        return res.status(500).json({
          message: "server error, please retry later"
        })
      }
      res.status(200).json(topics)
    });

});

router.post('/', validateToken, (req, res, next) => {
  let {title, url, text, isURL} = req.body;
  if (!title || (!url && !text)) {
    return res.status(400).json({
      message: "posting new topic failed, please retry"
    })
  }

  let publishBy = res.locals.username;
  let _id = mongoose.Types.ObjectId();
  let newTopic = new Topic({_id, ancestorId: _id, parentId: _id, rootTopic: true, title, url, text, isURL, publishBy, voters: [publishBy], points: 1,});
  newTopic.isNew = true;
  newTopic.save((err, savedTopic) => {
    if (err) {
      return res.status(500).json({
        message: "server error, please retry later"
      })
    }
    res.status(200).json(savedTopic)
  });
});

router.post('/comment', validateToken, (req, res) => {
  let {ancestorId, parentId, text} = req.body;
  if (!ancestorId || !parentId || !text) {
    return res.status(400).json({
      message: "adding topic comment failed, please retry"
    })
  }

  let username = res.locals.username;
  let _id = mongoose.Types.ObjectId();
  let newComment = new Topic({_id, ancestorId, parentId, text, publishBy: username, voters: [username], points: 1,});
  newComment.isNew = true;
  newComment.save((err, savedComment) => {
    if (err) {
      return res.status(500).json({
        message: "server error, please retry later"
      })
    }

    Topic.updateOne({ancestorId}, {$inc: {commentNum: 1}}, err => {
      if (err){
        console.log("err updating comment count in ancestor topic: ", err);
        return res.status(500).json({
          message: "err adding comment, please retry"
        })
      }
      res.status(200).json(savedComment)
    });
  });
});

router.post('/vote', validateToken, (req, res, next) => {
  let topicID = req.body.topicID;
  if (!topicID) {
    return res.status(400).json({
      message: "voting topic failed, please retry"
    })
  }

  Topic.updateOne({_id: topicID}, {$addToSet: {voters: res.locals.username}, $inc: {points: 1}}, err => {
    if (err){
      console.log("err voting topic: ", err);
      return res.status(500).json({
        message: "voting topic failed, please retry"
      })
    }
    return res.sendStatus(200)
  });
});

module.exports = router;
