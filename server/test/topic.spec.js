"use strict";

describe('Topic', function(){
  lt.beforeEach.withApp(app);
  beforeEach(function(){
    app.loopback.getModel('topic').remove({});
    app.loopback.getModel('like').remove({});
    app.loopback.getModel('user').remove({});
  });

  it('should create a topic', function(done){
    this.timeout(5000);

    common.loggedInUser(common.user[0], (err, data) => {

      common.createTopic({
        userId: data.res.body.userId,
        token: data.res.body.id,
        data: common.dataTopic
      }, (err, data) => {
        expect(data.res.statusCode).to.be(200);
        expect(data.res.body.title).to.be(common.dataTopic.title);
        expect(data.res.body.content).to.be(common.dataTopic.content);
        expect(data.res.body.userId).to.be(data.res.body.userId);
        expect(new Date().getTime() - new Date(data.res.body.createDate).getTime()).to.be.below(100000);
        done();
      });
    });
  });

  it('should delete a topic', function(done){
    this.timeout(5000);

    common.loggedInUser(common.user[0], (err, data) => {

      common.createTopic({
        userId: data.res.body.userId,
        token: data.res.body.id,
        data: common.dataTopic
      }, (err, dataCreate) => {
        var http = request(app)
        .delete('/api/users/'+data.res.body.userId+'/topics/'+dataCreate.res.body.id+'?access_token='+data.res.body.id)
        .set('Accept', 'application/json')
        .end((err) => {
            expect(http.res.statusCode).to.be(204);
            done();
        });
      });
    });
  });

  it('others cannot delete my topic, only I!!', function(done){
    this.timeout(5000);

    async.parallel({
      user1: (cb) => common.loggedInUser(common.user[0], cb),
      user2: (cb) => common.loggedInUser(common.user[1], cb),
    }, (err, result) => {
      common.createTopic({
        userId: result.user1.res.body.userId,
        token: result.user1.res.body.id,
        data: common.dataTopic
      }, (err, dataCreate) => {
        var http = request(app)
        .delete('/api/users/'+result.user1.res.body.userId+'/topics/'+dataCreate.res.body.id+'?access_token='+result.user2.res.body.id)
        .set('Accept', 'application/json')
        .end((err) => {
            expect(http.res.statusCode).to.be(401);
            done();
        });
      });

    });
  });

  it('should list topics with a like', function(done){
    this.timeout(5000);

    common.loggedInUser(common.user[0], (err, data) => {

      common.createTopic({
        userId: data.res.body.userId,
        token: data.res.body.id,
        data: common.dataTopic
      }, (err, dataCreate) => {
        common.createLike({
          token: data.res.body.id,
          userId: data.res.body.userId,
          topicId: dataCreate.res.body.id
        }, (err, dataLike) => {
          var http = request(app)
          .get('/api/topics/list?access_token='+data.res.body.id)
          .set('Accept', 'application/json')
          .end((err) => {
            expect(http.res.body.length).to.be(1);
            expect(http.res.body[0].likes.length).to.be(1);
            expect(http.res.statusCode).to.be(200);
            done();
          });
        })
      });
    });
  });

  it('should list topics without login', function(done){
    this.timeout(5000);

    common.loggedInUser(common.user[0], (err, data) => {

      common.createTopic({
        userId: data.res.body.userId,
        token: data.res.body.id,
        data: common.dataTopic
      }, (err, dataCreate) => {
        common.createLike({
          token: data.res.body.id,
          userId: data.res.body.userId,
          topicId: dataCreate.res.body.id
        }, (err, dataLike) => {
          var http = request(app)
          .get('/api/topics/list')
          .set('Accept', 'application/json')
          .end((err) => {
            expect(http.res.body.length).to.be(1);
            expect(http.res.body[0].likes.length).to.be(1);
            expect(http.res.statusCode).to.be(200);
            done();
          });
        })
      });
    });
  });

});