let newToken = require('../utils/newToken');

let bcrypt = require('bcrypt');
const saltRounds = 10;

let mongoSchema = require('../config/mongoSchema');
let User = mongoSchema.User;

let express = require('express');
let router = express.Router();

router.post('/', function(req, res, next) {
  let {username, password, password2} = req.body;
  if (!username || !password || password !== password2) {
    return res.status(400).json({ // bad request
      message: "signup failed, please check your username/password"
    })
  }

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).json({
        message: "server error, please retry later"
      });
    }

    let newUser = new User({username, password: hash});
    newUser.isNew = true;
    newUser.save((err, savedUser) => {
      if (err && err.code === 11000 ){
        res.status(400).json({
          message: "username(" + username + ") already exists, try another one"
        });
      } else if (err) {
        res.status(500).json({
          message: "server error, please retry later"
        });
      } else {
        let token = newToken(username);
        res.status(200).json({token, username})}
    })
  });
});

module.exports = router;
