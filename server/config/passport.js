const User = require('../models/user');
const local = require('./passport-strategies/local');


module.exports = (app, passport) => {

  passport.use('login', local);

  // Configure Passport authenticated session persistence.
  passport.serializeUser((user, cb) => cb(null, user.cuid));

  passport.deserializeUser((id, cb) => {
    User.findOne({ cuid: id }, (err, user) => cb(err, user));
  });

  // Pass the passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

};
