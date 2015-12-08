'use strict';

process.env.ENV = 'test';
global.expect = require('expect.js');
global.request = require('supertest');
global.async = require('async');
global._ = require('lodash');
global.lt = require('loopback-testing');
global.app = require('../server/server.js');

global.common = {
	makeUser(obj, cb) {
		var http = request(app)
			.post('/api/users')
			.set('Accept', 'application/json')
			.send(obj)
			.end((err) => cb(err, http));
	},
	loggedInUser(obj, cb){
		this.makeUser(obj, (err, data) => {
			var http = request(app)
				.post('/api/users/login')
				.set('Accept', 'application/json')
				.send(obj)
				.end((err) => cb(err, http));
		});
	},
	createTopic(obj, cb){
		var http = request(app)
        .post('/api/users/'+obj.userId+'/topics?access_token='+obj.token)
        .set('Accept', 'application/json')
        .send(obj.data)
        .end((err) => cb(err, http));
	},
	createLike(obj, cb){
		var http = request(app)
        .post('/api/topics/'+obj.topicId+'/likes?access_token='+obj.token)
        .set('Accept', 'application/json')
        .send({
           'userId': obj.userId,
        })
        .end((err) => cb(err, http));
	},
	deleteLike(obj, cb){
		var http = request(app)
        .delete('/api/topics/'+obj.topicId+'/like/'+obj.likeId+'?access_token='+obj.token)
        .set('Accept', 'application/json')
        .end((err) => cb(err, http));
	},
	listTopics(obj, cb){
		var http = request(app)
          .get('/api/topics/list?access_token='+obj.token)
          .set('Accept', 'application/json')
          .end((err) => cb(err, http));
	},
	dataTopic: {
		"title": "Thats a long title",
		"content": "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standa"
	},
	user: [
		{
	      'password': 'string',
	      'username': 'user5'
	    },
	    {
	      'password': 'string',
	      'username': 'user6'
	    },
	    {
	      'password': 'string',
	      'username': 'user7'
	    }
	]
}