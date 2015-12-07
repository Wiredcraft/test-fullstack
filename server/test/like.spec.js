"use strict";

describe('Like', function() {
	lt.beforeEach.withApp(app);
  beforeEach(function(){
    app.loopback.getModel('topic').remove({});
    app.loopback.getModel('like').remove({});
    app.loopback.getModel('user').remove({});
  });

	it('should create a like', function(done) {
		this.timeout(5000);

		async.waterfall([
			function(cb) {
				common.loggedInUser(common.user[0], cb);
			},
			function(user, cb) {
        common.createTopic({
          userId: user.res.body.userId,
          token: user.res.body.id,
          data: common.dataTopic
        }, (err, data) => cb(err, user, data));
      },
			function(user, topic, cb) {
				common.createLike({
          token: user.res.body.id,
          userId: user.res.body.userId,
          topicId: topic.res.body.id
        }, (err, data) => cb(err, user, topic, data));
			}
		], function(err, user, topic, like) {
			expect(like.res.body.id).not.to.be(undefined);
      expect(like.res.body.userId).to.be(user.res.body.userId);
      expect(like.res.body.topicId).to.be(topic.res.body.id);
      done();
		});
	});

  it('should delete a like', function(done) {
    this.timeout(5000);

    async.waterfall([
      function(cb) {
        common.loggedInUser(common.user[0], cb);
      },
      function(user, cb) {
        common.createTopic({
          userId: user.res.body.userId,
          token: user.res.body.id,
          data: common.dataTopic
        }, (err, data) => cb(err, user, data));
      },
      function(user, topic, cb) {
        common.createLike({
          token: user.res.body.id,
          userId: user.res.body.userId,
          topicId: topic.res.body.id
        }, (err, data) => cb(err, user, topic, data));
      },
      function(user, topic, like, cb) {
        common.deleteLike({
          token: user.res.body.id,
          likeId: like.res.body.id,
          topicId: topic.res.body.id
        }, (err, data) => cb(err, data, user, topic));
      }
    ], function(err, result, user, topic) {
      expect(result.res.statusCode).to.be(204);
      common.listTopics({
        token: user.res.body.id
      }, (err, data) => {
          let ele = _.findWhere(data.res.body, {
            id: topic.res.body.id
          });
          expect(ele.likes.length).to.be(0);
          done();
      });
    });
  });

  it('everybody should be able to like my topic', function(done) {
    this.timeout(5000);

    async.waterfall([
      function(cb) {
        common.loggedInUser(common.user[0], cb);
      },
      function(user1, cb) {
        common.loggedInUser(common.user[1], (err, data) => cb(err, user1, data));
      },
      function(user1, user2, cb) {
        common.createTopic({
          userId: user1.res.body.userId,
          token: user1.res.body.id,
          data: common.dataTopic
        }, (err, data) => cb(err, user1, user2, data));
      },
      function(user1, user2, topic, cb) {
        common.createLike({
          token: user2.res.body.id,
          userId: user2.res.body.userId,
          topicId: topic.res.body.id
        }, (err, data) => cb(err, data, user1, user2, topic, data));
      }
    ], function(err, result, user1, user2, topic) {
      expect(result.res.statusCode).to.be(200);
      common.listTopics({
        token: user1.res.body.id
      }, (err, data) => {
          let ele = _.findWhere(data.res.body, {
            id: topic.res.body.id
          });
          expect(ele.likes.length).to.be(1);
          done();
      });
    });
  });

  it('others cannot remove my like', function(done) {
    this.timeout(5000);

    async.waterfall([
      function(cb) {
        common.loggedInUser(common.user[0], cb);
      },
      function(user1, cb) {
        common.loggedInUser(common.user[1], (err, data) => cb(err, user1, data));
      },
      function(user1, user2, cb) {
        common.loggedInUser(common.user[2], (err, data) => cb(err, user1, user2, data));
      },
      function(user1, user2, user3, cb) {
        common.createTopic({
          userId: user1.res.body.userId,
          token: user1.res.body.id,
          data: common.dataTopic
        }, (err, data) => cb(err, user1, user2, user3, data));
      },
      function(user1, user2, user3, topic, cb) {
        common.createLike({
          token: user2.res.body.id,
          userId: user2.res.body.userId,
          topicId: topic.res.body.id
        }, (err, data) => cb(err, user1, user2, user3, topic, data));
      },
      function(user1, user2, user3, topic, like, cb) {
        common.deleteLike({
          token: user3.res.body.id,
          likeId: like.res.body.id,
          topicId: topic.res.body.id
        }, cb);
      }
    ], function(err, result) {
      expect(result.res.statusCode).to.be(401);
      done();
    });
  });

  it('only i should be able to remove my like', function(done) {
    this.timeout(5000);

    async.waterfall([
      function(cb) {
        common.loggedInUser(common.user[0], cb);
      },
      function(user1, cb) {
        common.loggedInUser(common.user[1], (err, data) => cb(err, user1, data));
      },
      function(user1, user2, cb) {
        common.loggedInUser(common.user[2], (err, data) => cb(err, user1, user2, data));
      },
      function(user1, user2, user3, cb) {
        common.createTopic({
          userId: user1.res.body.userId,
          token: user1.res.body.id,
          data: common.dataTopic
        }, (err, data) => cb(err, user1, user2, user3, data));
      },
      function(user1, user2, user3, topic, cb) {
        common.createLike({
          token: user2.res.body.id,
          userId: user2.res.body.userId,
          topicId: topic.res.body.id
        }, (err, data) => cb(err, user1, user2, user3, topic, data));
      },
      function(user1, user2, user3, topic, like, cb) {
        common.deleteLike({
          token: user2.res.body.id,
          likeId: like.res.body.id,
          topicId: topic.res.body.id
        }, cb);
      }
    ], function(err, result) {
      expect(result.res.statusCode).to.be(204);
      done();
    });
  });


});