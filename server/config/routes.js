const express = require('express');
const UserController = require('../controllers/user.controller');
const PollController = require('../controllers/poll.controller');

module.exports = (app, passport) => {
  const router = new express.Router();
  const Base = (req, res) => {
    res.send('<h1>API Server Works.</h1>');
  };

  router.get('/api', Base);
  router.post('/api/register', UserController.registerLocalUser);

  // LOCAL AUTH
  router.post('/api/login', function(req, res, next) {
    passport.authenticate('login', { session: false }, function(err, user, message) {
      if (err || !user) {
        res.statusMessage = err;
        return res.status(400).end();
      } else {
        req.login(user, { session: false }, function(err) {
          if (err) {
            console.error(`AUTH_USER: Error during local login. ${err}`);
            res.statusMessage = err;
            return res.status(400).end();
          } else {
            const token = UserController.generateToken(user);
            user['token'] = token;
            console.log(`AUTH_USER: Successful login for user "${user.name}":`, user);
            res.statusMessage = message;
            return res.status(200).send({ user, message });
          }
        });
      }
    })(req, res, next);
  });

  router.get('/api/polls', PollController.getPolls);

  router.post('/api/poll/create', PollController.postPoll);

  router.put('/api/poll/:pollId/vote', PollController.updatePollVote);

  app.use(router);
};
