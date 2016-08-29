'use strict';

var debug = require('debug')('lt:boot');

module.exports = function(app) {
  // dataSource
  var ds = app.dataSources.db;

  // models
  var AppUser = app.models.AppUser;
  var Talk = app.models.Talk;
  var Vote = app.models.Vote;

  var appUsers = [
    {username: 'alice', email: 'alice@example.com', password: 'alice'},
    {username: 'bob', email: 'bob@example.com', password: 'bob'},
    {username: 'charlie', email: 'charlie@example.com', password: 'charlie'},
  ];

  var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
  var talks = [
    {
      title: 'Inside the mind of a master procrastinator',
      description: "Tim Urban knows that procrastination doesn't make sense, but he's never been able to shake his habit of waiting until the last minute to get things done. In this hilarious and insightful talk, Urban takes us on a journey through YouTube binges, Wikipedia rabbit holes and bouts of staring out the window — and encourages us to think harder about what we're really procrastinating on, before we run out of time.",
      speaker: 'Tim Urban',
      cover: 'https://pi.tedcdn.com/r/pe.tedcdn.com/images/ted/4d10247c2b89098e6f7103065276923e9432e914_2880x1620.jpg?cb=05112016&quality=89&w=700',
      createdAt: new Date() - DAY_IN_MILLISECONDS / 6,
      voteCount: 1,
    },
    {
      title: 'Animal tales from icy wonderlands',
      description: 'Diving under the Antarctic ice to get close to the much-feared leopard seal, photographer Paul Nicklen found an extraordinary new friend. Share his hilarious, passionate stories of the polar wonderlands, illustrated by glorious images of the animals who live on and under the ice.',
      speaker: 'Paul Nicklen',
      cover: 'https://pi.tedcdn.com/r/pe.tedcdn.com/images/ted/1f6a9f396100ba693c5534a3a8ca597244ff40c6_800x600.jpg?cb=05112016&quality=89&w=700',
      createdAt: new Date() - DAY_IN_MILLISECONDS,
      voteCount: 2,
    },
    {
      title: 'Is our universe the only universe?',
      description: 'Is there more than one universe? In this visually rich, action-packed talk, Brian Greene shows how the unanswered questions of physics (starting with a big one: What caused the Big Bang?) have led to the theory that our own universe is just one of many in the "multiverse."',
      speaker: 'Brian Greene',
      cover: 'http://i.imgur.com/i937FSq.jpg',
      createdAt: new Date() - DAY_IN_MILLISECONDS * 2,
      voteCount: 1,
    },
  ];

  function createAppUsers() {
    return new Promise(function(resolve, reject) {
      ds.automigrate('AppUser', function(err) {
        if (err) reject(err);

        AppUser.create(appUsers, function(err, ret) {
          if (err) reject(err);

          debug(ret);
          resolve(ret);
        });
      });
    });
  }

  function createTalks(users) {
    return new Promise(function(resolve, reject) {
      ds.automigrate('Talk', function(err) {
        if (err) reject(err);

        talks[0].submitterId = users[1].id;
        talks[1].submitterId = users[2].id;
        talks[2].submitterId = users[0].id;

        Talk.create(talks, function(err, ret) {
          if (err) reject(err);

          debug(ret);
          resolve({
            users: users,
            talks: ret,
          });
        });
      });
    });
  }

  function createVotes(data) {
    var users = data.users;
    var talks = data.talks;

    return new Promise(function(resolve, reject) {
      ds.automigrate('Vote', function(err) {
        if (err) reject(err);

        var votes = [
          {
            talkId: talks[0].id,
            voterId: users[1].id,
          },
          {
            talkId: talks[1].id,
            voterId: users[2].id,
          },
          {
            talkId: talks[1].id,
            voterId: users[0].id,
          },
          {
            talkId: talks[2].id,
            voterId: users[1].id,
          },
        ];

        Vote.create(votes, function(err, ret) {
          if (err) reject(err);

          debug(ret);
          resolve(ret);
        });
      });
    });
  }

  // AppUser needs to be created first
  createAppUsers()
    .then(createTalks)
    .then(createVotes)
    .catch(function(err) {
      console.log(err);
    });
};
