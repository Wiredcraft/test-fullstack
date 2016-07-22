"use strict";

var app = require('../server/server');
var request = require('supertest');
var assert = require('assert');
var loopback = require('loopback');

describe('Publisher', function () {
  it('should return 200 response while accessing api', function (done) {
    request(app)
      .post('/api/Publishers/login')
      .send({
        username: 'flyingant',
        password: 'flyingant'
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        assert(typeof res.body === 'object');
        done();
      });
  });
});
