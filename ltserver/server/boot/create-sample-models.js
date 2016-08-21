'use strict';

module.exports = function(app) {
  // dataSource
  var ds = app.dataSources.db;

  // models
  var AppUser = app.models.AppUser;
  var Talk = app.models.Talk;
  var Vote = app.models.Vote;

  var appUsers = [
    {username: 'alice', email: 'alice@example.com', password: 'quickfox'},
    {username: 'bob', email: 'bob@example.com', password: 'quickfox'},
    {username: 'charlie', email: 'charlie@example.com', password: 'quickfox'},
  ];

  var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
  var talks = [
    {
      title: 'How to beat procratination',
      description: 'Jon talks about how to beat procratination',
      speaker: 'Jon Snow',
      cover: 'http://carlog.qiniudn.com/starry-night.jpg',
      createdAt: new Date(),
    },
    {
      title: 'What happens after you click a link in your browser',
      description: 'John talks about what happens after you click' +
        ' a link in your browser',
      speaker: 'Arya Stark',
      cover: 'http://carlog.qiniudn.com/starry-night.jpg',
      createdAt: new Date() - DAY_IN_MILLISECONDS,
    },
    {
      title: '10 thinks you did not know about React',
      description: 'Bran talks about how to beat procratination',
      speaker: 'Bran Snow',
      cover: 'http://carlog.qiniudn.com/starry-night.jpg',
      createdAt: new Date() - DAY_IN_MILLISECONDS * 2,
    },
  ];

  function createAppUsers() {
    return new Promise(function(resolve, reject) {
      ds.automigrate('AppUser', function(err) {
        if (err) reject(err);

        AppUser.create(appUsers, function(err, ret) {
          if (err) reject(err);

          console.log(ret);
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

          console.log(ret);
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

          console.log(ret);
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
