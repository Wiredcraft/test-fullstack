module.exports = function(Publisher) {

  // use for user register
  Publisher.user = function(username, password, cb) {
    Publisher.find({where: {username: username}}, function(err, publishers) {
      if(publishers.length === 0){
        //create a publisher instance
        Publisher.create({
          username: username,
          password: password
        }, function(err, user) {
          cb(null, {
            success: true,
            username: user.username,
            userId: user.id
          });
        });
      } else {
        cb(null, {
          success: false,
          message: 'Username is already existed.'
        });
      }
    });
  };
  Publisher.remoteMethod(
    'user',
    {
      accepts: [
        {
          arg: 'username', type: 'string'
        },
        {
          arg: 'password', type: 'string'
        },
      ],
      http: {path: '/user', verb: 'post'},
      returns: {arg: 'status', type: 'string'}
    }
  )

  // use for user verified
  Publisher.verify = function(username, password, cb) {
    Publisher.find({where: {username: username}}, function(err, publishers) {
      if(publishers.length === 0){
        cb(null, {
          success: false,
          message: 'Username is not existed. Please check the username and password.'
        });
      }
      var user = publishers[0];
      if(user.password === password){
        cb(null, {
          success: true,
          username: user.username,
          userId: user.id
        });
      } else {
        cb(null, {
          success: false,
          message: 'Password is not match. Please try it again.'
        });
      }
    });
  };
  Publisher.remoteMethod(
    'verify',
    {
      accepts: [
        {
          arg: 'username', type: 'string'
        },
        {
          arg: 'password', type: 'string'
        },
      ],
      http: {path: '/verify', verb: 'post'},
      returns: {arg: 'status', type: 'string'}
    }
  );

  Publisher.disableRemoteMethod('create', true);
  Publisher.disableRemoteMethod('upsert', true);
  Publisher.disableRemoteMethod("updateAll", true);
  Publisher.disableRemoteMethod("updateAttributes", true);
  Publisher.disableRemoteMethod('findById', true);
  Publisher.disableRemoteMethod("deleteById", true);
  Publisher.disableRemoteMethod('createChangeStream', true);

  Publisher.disableRemoteMethod('findOne', true);
  Publisher.disableRemoteMethod('count', true);
  Publisher.disableRemoteMethod('findOne', true);
  Publisher.disableRemoteMethod('replaceOrCreate', true);

};


