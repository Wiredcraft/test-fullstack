'use strict';

var app = require('../server/server');
var request = require('supertest');
var assert = require('assert');
var loopback = require('loopback');

function json(verb, url, token) {
  if (token) {
    if(url.indexOf('?') > -1) {
      url += '&access_token=' + token;
    } else {
      url += '?access_token=' + token;
    }
  }
  return request(app)[verb](url)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/);
}

function fetch(args) {
  return new Promise(function(resolve, reject) {
    var req = json(args.verb, args.url, args.token);
    if (args.data) req = req.send(args.data);
    resolve(req);
  });
}

describe('API test', function() {
  var token;
  var user = {
    username: 'charlie',
    password: 'quickfox',
    id: 3,
  };

  // new user to be registered
  var dave = {
    username: 'dave',
    email: 'dave@gmail.com',
    password: 'imdave'
  };

  var talk = {
    title: 'asdf',
    description: 'lorsem description',
    speaker: 'Louis',
    cover: 'http://i.imgur.com/zpdk3Wq.png',
    createdAt: '2016-08-20T12:34:00.000Z',
    submitterId: user.id,
  };

  // TODO remove hard code
  var initTalksLen = 3;
  var initTalkVoteCount = 1;

  before(function(done) {
    require('./start-server');
    done();
  });

  after(function(done) {
    app.removeAllListeners('started');
    app.removeAllListeners('loaded');
    done();
  });

  // AppUser

  it('should return all talks for anonymous users', function(done) {
    json('get', '/api/Talks')
      .expect(200, function(err, res) {
        assert(res.body.length === initTalksLen);
        done();
      });
  });

  it('login', function(done) {
    json('post', '/api/AppUsers/login')
      .send({
        username: user.username,
        password: user.password,
      })
      .expect(200, function(err, res) {
        assert(typeof res.body === 'object');
        assert(res.body.userId === user.id);
        token = res.body.id;
        done();
      });
  });

  it('logout', function(done) {
    fetch({
      verb: 'post',
      url: '/api/AppUsers/logout',
      token: token
    })
    .then(function (ret) {
      assert.equal(204, ret.statusCode);
    })
    .then(done)
    .catch(done);
  });


  it('new user signup', function (done) {
    json('post', '/api/AppUsers')
      .send({
        username: dave.username,
        email: dave.email,
        password: dave.password
      })
      .expect(200, function(err, res) {
        if (err) done(err);
        dave.id = res.body.id;
        done();
      });
  });

  it('should return error if signup using exist email', function (done) {
    json('post', '/api/AppUsers')
      .send({
        username: 'dsd',
        email: dave.email,
        password: 'sdf'
      })
      .expect(422, done);
  });

  // Talk

  it('should not allow create a talk without login', function(done) {
    json('post', '/api/Talks')
      .send(talk)
      .expect(401, function(err, res) {
        assert(/Authorization\sRequired/i.test(res.body.error.message));
        done();
      });
  });

  it('should able to create a talk after login', function(done) {
    // login
    json('post', '/api/AppUsers/login')
      .send({
        username: user.username,
        password: user.password,
      })
      .expect(200, function(err, res) {
        assert(typeof res.body === 'object');
        assert(res.body.userId === user.id);
        token = res.body.id;

        json('post', '/api/Talks', token)
          .send(talk)
          .expect(200, function(err, res) {
            json('get', '/api/Talks')
              .expect(200, function(err, res) {
                assert.equal(res.body.length, initTalksLen + 1);
                done();
              });
          });
      });
  });

  it('should get upvote count of all talks', function (done) {
    json('get', '/api/Talks?filter[order]=voteCount%20DESC')
      .expect(200, function(err, res) {
        var talks = res.body;
        talks.forEach(function (t) {
          assert(t.voteCount >= 0);
        });
        done();
      });
  });

  // Vote

  it('should not allow vote without login', function(done) {
    json('post', '/api/Votes')
      .send({talkId: 3, voterId: user.id})
      .expect(401, function(err, res) {
        assert(/Authorization\sRequired/i.test(res.body.error.message));
        done();
      });
  });

  it('should able to vote after login', function(done) {
    var talkId = 3;
    var beforeCount;

    // get vote count before voting
    fetch({
      verb: 'get',
      url: '/api/Talks/' + talkId,
      token: token
    })
    .then(function (res) {
      assert.equal(200, res.statusCode);
      beforeCount = res.body.voteCount;
    })
    .then(function () {
      return fetch({
        verb: 'post',
        url: '/api/Votes',
        token: token,
        data: {talkId: 3, voterId: user.id}
      })
    })
    .then(function (res) {
      assert.equal(200, res.statusCode);
    })
    .then(function () {
      return fetch({
        verb: 'get',
        url: '/api/Talks/' + talkId,
        token: token
      })
    })
    .then(function (res) {
      assert.equal(200, res.statusCode);
      assert.equal(res.body.voteCount, beforeCount + 1);
    })
    .then(done)
    .catch(done);
  });


  it('should able to get all voted talks id for a single user', function (done) {
    var beforeCount = 0;
    var afterCount = 0;

    function votesUrl(userid) {
      return (
        '/api/AppUsers/' +
        userid +
        '/voted' +
        '?filter[order]=voteCount%20DESC' +
        '&filter[fields]=id'
      );
    }

    // login
    fetch({
      verb: 'post',
      url: '/api/AppUsers/login',
      data: {
        username: dave.username,
        password: dave.password,
      }
    })
    .then(function (res) {
      dave.token = res.body.id;
    })
    .then(function () {
      // get current voted talks count
      return fetch({
        verb: 'get',
        url: votesUrl(dave.id),
        token: dave.token
      });
    })
    .then(function (res) {
      beforeCount = res.body.length;
    })
    .then(function () {
      // issue a vote
      return fetch({
        verb: 'post',
        url: '/api/Votes',
        token: dave.token,
        data: {talkId: 3, voterId: dave.id}
      });
    })
    .then(function () {
      // get current voted talks count, again
      // should increased by 1
      return fetch({
        verb: 'get',
        url: votesUrl(dave.id),
        token: dave.token
      });
    })
    .then(function (res) {
      assert.equal(beforeCount + 1, res.body.length);
    })
    .then(done)
    .catch(done);
  });
});
