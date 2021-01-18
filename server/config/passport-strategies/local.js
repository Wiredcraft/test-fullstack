const LocalStrategy = require('passport-local').Strategy;
const userController = require('../../controllers/user.controller');

module.exports = new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password'
  }, function(username, password, done) {
    return userController.loginLocalUser(username, password, done);
  }
);
