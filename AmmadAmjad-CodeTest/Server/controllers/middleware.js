var cryptojs = require('crypto-js');
const {
  lastIndexOf
} = require('underscore');

module.exports = function (db) {
  return {
    accessControl: function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE");
      res.header("Access-Control-Allow-Headers",
        "Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,Keep-Alive,X-Requested-With,If-Modified-Since,name,type"
      );
      next();
    },
    errorHandler: function (e, req, res, next) {

      if (e instanceof db.Sequelize.ForeignKeyConstraintError) {
        res.status(409).json({
          message: "Incorrect ID passed. Please make sure the ID is valid and exists"
        })
      } else if (e instanceof db.Sequelize.ValidationError) {
        const messages = {};
        e.errors.forEach((error) => {
          let message;
          switch (error.validatorKey) {

            case 'isEmail':
              message = error.value + ' is not a valid email address. Please enter a valid email';
              break;
            case 'isDate':
              message = 'Please enter a valid date';
              break;
            case 'len':
              if (error.validatorArgs[0] === error.validatorArgs[1]) {
                message = 'Use ' + error.validatorArgs[0] + ' characters for ' + error.path;
              } else {
                message = 'Use between ' + error.validatorArgs[0] + ' and ' + error.validatorArgs[1] + ' characters for ' + error.path;
              }
              break;
            case 'min':
              message = 'Use a number greater or equal to ' + error.validatorArgs[0] + 'for ' + error.path;
              break;
            case 'max':
              message = 'Use a number less or equal to ' + error.validatorArgs[0] + 'for ' + error.path;
              break;
            case 'isInt':
              message = 'Please use an integer number for ' + error.path;
              break;
            case 'is_null':
              message = error.path + ' is required. Please complete ' + error.path + ' field';
              break;
            case 'not_unique':
              message = error.value + ' is taken. Please choose another ' + error.path;
          }
          messages["error"] = message;
        });
        res.status(422).json(messages)
      } else {
        console.log(e);
        console.log(e.status);
        console.log(e.message);


        res.status(e.status || 500).json({
          message: e.message
        })
      }
    },
    logger: function (req, res, next) {
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
    optionalAuthentication: function (req, res, next) {
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
        .then(function (user) {
          if (!user) {
            next();
            return;
          }
          req.user = user;
          next();
        })
        .catch(function () {
          next();
          return;
        });
    },
    requireAuthentication: function (req, res, next) {
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
        .then(function (user) {
          if (!user) {
            res.status(401).send({
              message: "User not found , please make sure the token is valid . Re-login and try with the new login auth token."
            });
            return;
          }
          req.user = user;
          next();
        })
        .catch(function () {
          res.status(401).send();
          return;
        });
    }
  };

};