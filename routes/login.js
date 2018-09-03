let newToken = require('../utils/newToken');
let bcrypt = require('bcrypt');

let mongoSchema = require('../config/mongoSchema');
let User = mongoSchema.User;

let express = require('express');
let router = express.Router();

router.post('/', function(req, res, next) {
  console.log('req.body: ', req.body);

  let {username, password} = req.body;
  if (!username || !password) {
    return res.status(400).json({ // bad request
      message: "login failed, please check your username/password"
    })
  }

  User.findOne({username}, (err, user) => {
    console.log('fetched user: ', user);
    if (err){
      return res.status(500).json({
        message: "server error, please retry later"
      });
    }

    if (!user) {
      console.log("username not exists");
      return res.status(400).json({
        message: "login failed, please check your username/password"
      });
    }

    bcrypt.compare(password, user.password, (err, isMatched) => {
      if (err){
        return res.status(500).json({
          message: "server error, please retry later"
        });
      }

      if (isMatched){
        let token = newToken(username);
        res.status(200).json({token, username})
      } else {
        console.log("wrong password");
        res.status(401).json({
          message: "login failed, please check your username/password"
        })
      }
    });
  });
});

module.exports = router;
