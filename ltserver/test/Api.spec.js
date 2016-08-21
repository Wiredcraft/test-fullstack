'use strict';

var app = require('../server/server');
var request = require('supertest');
var assert = require('assert');
var loopback = require('loopback');

function json(verb, url) {
  return request(app)[verb](url)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/);
}

describe('API', function() {
  var token;
  var user = {
    username: 'charlie',
    password: 'quickfox',
    id: 3,
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

  it('should able to login', function(done) {
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
    json('post', '/api/Talks?access_token=' + token)
      .send(talk)
      .expect(200, function(err, res) {
        json('get', '/api/Talks')
          .expect(200, function(err, res) {
            assert(res.body.length === initTalksLen + 1);
            done();
          });
      });
  });

  it('should get upvote count of a talk', function(done) {
    json('get', '/api/Talks/' + user.id + '/appUsers/count')
      .expect(200, function(err, res) {
        assert(res.body.count === initTalkVoteCount);
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
    json('post', '/api/Votes?access_token=' + token)
      .send({talkId: 3, voterId: user.id})
      .expect(200, function(err, res) {
        json('get', '/api/Talks/' + user.id + '/appUsers/count')
          .expect(200, function(err, res) {
            assert(res.body.count === initTalkVoteCount + 1);
            done();
          });
      });
  });
});
