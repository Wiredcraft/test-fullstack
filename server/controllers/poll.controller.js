const User = require('../models/user');
const Poll = require('../models/poll');
const cuid = require('cuid');

module.exports = {
  getPolls,
  postPoll,
  updatePollVote
};


function getPolls(req, res) {
  Poll.find({}).sort({date_created: -1}).exec((err, pollsReceived) => {
    if (err) {
      console.error(`GET_POLLS: Error, unable to find polls. ${err}`);
      res.statusMessage = `Unable to find polls. ${err}`;
      res.status(502).end();
    } else {
      let polls = pollsReceived || [];
      console.log(`GET_POLLS: Success! Number of polls: ${polls.length}`);
      res.status(200).send({ polls });
    }
  });
};

function postPoll(req, res) {
  console.log(req.body);
  const body = req.body;
  if (!body) {
    console.error('POST_POLL: Error, nothing given to create poll within request body.');
    res.statusMessage = 'Nothing given to create poll within request body.';
    res.status(412).end();
  } else if (!body.title || !body.user_id || !body.user_name) {
    console.error(`POST_POLL: Error, prerequisite properties not met for poll creation in request body:`, body);
    res.statusMessage = 'Prerequisite properties not met for poll creation.';
    res.status(412).end();
  } else {
    Poll.where({ title: body.title }).findOne(function (err, existingPoll) {
      if (!!existingPoll) {
        console.error(`POST_POLL: Error, poll with title "${body.title}" already exists:`, existingPoll);
        res.statusMessage = `Poll with title "${body.title}" already exists.`;
        res.status(412).end();
      } else {
        const userId = body.user_id;
        User.where({ "cuid": userId }).findOne(function (err, user) {
          if (err) {
            console.error(`POST_POLL: Error while searching for existing user with id "${userId}": ${err}`);
            res.statusMessage = `Error while searching for existing user with id "${userId}"`;
            res.status(502).end();
          } else if (!user) {
            console.error(`POST_POLL: Error, unable to find existing user with id "${userId}".`);
            res.statusMessage = `Unable to find existing user with id "${userId}".`;
            res.status(410).end();
          } else if (!user.name || !user.cuid) {
            console.error(`POST_POLL: Error, user with id "${userId}" does not have sufficient info required to create poll.`);
            res.statusMessage = `User with id "${userId}" does not have sufficient info required to create poll.`;
            res.status(412).end();
          } else {
            const newPoll = new Poll(req.body);
            newPoll.set({
              user_name: user.name,
              user_id: user.cuid
            });
            newPoll.save(function(err, poll) {
              if (err) {
                console.error(`POST_POLL: Error while saving new poll:`, newPoll, err);
                res.statusMessage = `Error while saving new poll: ${err}`;
                res.status(502).end();
              } else if (!poll) {
                console.error(`POST_POLL: Error, unable to find new poll after save:`, newPoll);
                res.statusMessage = 'Unable to find new poll after save.';
                res.status(410).end();
              } else {
                console.log(`POST_POLL: Successfully created poll: ${poll}`);
                res.statusMessage = 'Successfully created poll.';
                res.status(201).send({ poll, message: `Poll "${poll.title}" created.` });
              }
            });
            // TODO
            // Insert newPoll id into user.polls []
          }
        });
      }
    });
  }
};

function updatePollVote(req, res) {
  var id = req.params.pollId;
  var body = req.body;
  if (!id) {
    console.error(`UPDATE_POLL_VOTE: Error, unable to find pollId within params '${req.params}'.`);
    res.statusMessage = `Unable to find pollId within params '${req.params}'.`;
    res.status(412).end();
  } else if (!body || !body.voterId) {
    console.error(`UPDATE_POLL_VOTE: Error, nothing given to update poll with id '${id}:`, body);
    res.statusMessage = `Prerequisite properties not met to update poll with id '${id}'.`;
    res.status(412).end();
  } else {
    const newDate = (new Date().toISOString());
    Poll.findOneAndUpdate(
      { "cuid": id },
      {
        $inc: {
          "votes": 1
        },
        $set: { "date_updated": (new Date().toISOString()) }
      },
      { "new": true },
      function(err, poll) {
        if (err) {
          console.error(`UPDATE_POLL_VOTE: Error while searching for poll with id "${id}": ${err}`);
          res.statusMessage = `Error while searching for poll with id "${id}": ${err}.`;
          res.status(502).end();
        } else if (!poll) {
          console.error(`UPDATE_POLL_VOTE: Error, unable to find poll with id "${id}".`);
          res.statusMessage = `Unable to find existing poll with id "${id}".`;
          res.status(410).end();
        } else {
          console.log(`UPDATE_POLL_VOTE: Updated poll vote with poll update: ${poll}`);
          res.statusMessage = 'Successfully updated poll.';
          res.status(200).send({ poll, message: `You voted for the poll "${poll.title}".` });
        }
      }
    );
  }
};