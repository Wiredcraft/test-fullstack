
describe('User', function() {
  lt.beforeEach.withApp(app);
  beforeEach(function(){
    app.loopback.getModel('topic').remove({});
    app.loopback.getModel('like').remove({});
    app.loopback.getModel('user').remove({});
  });
  
  it('should create a user', function(done){
    this.timeout(5000);

    common.makeUser(common.user[0], (err, data) => {
      expect(data.res.statusCode).to.be(200);
      expect(data.res.body.username).to.be('user5');
      done();
    });
  });

  it('should login the user', function(done){
    this.timeout(5000);

    common.loggedInUser(common.user[0], (err, data) => {
      expect(data.res.statusCode).to.be(200);
      expect(data.res.body.id.length).to.be.greaterThan(50);
      done();
    });
  });
});