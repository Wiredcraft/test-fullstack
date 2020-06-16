var cryptojs = require('crypto-js');

module.exports = function(db) {
  return {
    logger: function(req, res, next) {
      console.log(
        "Request : " +
        new Date().toString() +
        " " +
        req.method +
        " " +
        req.originalUrl
      );
      next();
    },
    optionalAuthentication: function(req , res , next){
      var token = req.get("Authorization") || "";
      if (token === undefined || token === "") {
        next();
        return;
      }
      db.user
        .findOne({
          where: {
            tokenHash: cryptojs.MD5(token).toString()
          }
        })
        .then(function(user) {
          if (!user) {
            next();
            return;
          }
          req.user = user;
          next();
        })
        .catch(function() {
          next();
          return;
        });
    },
    requireAuthentication: function(req, res, next) {
      var token = req.get("Authorization") || "";
      if (token === undefined || token === "") {
        res.status(401).send({
          message: "Please include user token in header as Authentication"
        });
        return;
      }
      db.user
        .findOne({
          where: {
            tokenHash: cryptojs.MD5(token).toString()
          }
        })
        .then(function(user) {
          if (!user) {
            res.status(401).send({
              message: "User not found , please make sure the token is valid . Re-login and try with the new login auth token."
            });
            return;
          }
          req.user = user;
          next();
        })
        .catch(function() {
          res.status(401).send();
          return;
        });
    }
  };

};
