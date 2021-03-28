const User = require('../modules/User')

const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.secret

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id, (err, user) => {
        if (err) {
          return done(err, false)
        }
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      })
    })
  )
}
