var disableAllMethods = require('../../utils/helper').disableAllMethods;

module.exports = function(Publisher) {
  //disable the all methods
  disableAllMethods(Publisher, ["create"]);

  // verify the user before create the user
  Publisher.beforeRemote('create', function(ctx, publisher, next) {
    var username = ctx.req.body.username;
    var password = ctx.req.body.password;
    var confirmPassword = ctx.req.body.confirmPassword;
    if(password !== confirmPassword){
      ctx.res.send({
        success: false,
        message: "Password is not match."
      })
      return
    }

    Publisher.afterRemote('create', function(ctx, publisher, next) {
      ctx.result.success = true;
      next();
    });

    Publisher.find({where: {username: username}}, function(err, publishers) {
        if (publishers.length === 0) {
          next();
        } else {
          ctx.res.send({
            success: false,
            message: "User is already existed."
          })
        }
    });
  });

  // user login
  Publisher.login = function(username, password, cb) {
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
          id: user.id
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
    'login',
    {
      accepts: [
        {
          arg: 'username', type: 'string'
        },
        {
          arg: 'password', type: 'string'
        },
      ],
      http: {path: '/login', verb: 'post'},
      returns: {arg: 'status', type: 'string'}
    }
  );

};


