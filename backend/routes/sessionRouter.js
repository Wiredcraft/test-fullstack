var express = require('express');
var jwt = require('jwt-simple');
var httpStatus = require('http-status-codes');
var config = require('../config/main');
var User = require('../models/user');
var sessionRouter = express.Router();


sessionRouter.post('/', function (req, res, next) {
    if (!req.body.username || !req.body.password) {
        res.status(httpStatus.BAD_REQUEST).json({message: 'username, password required'});
        return;
    }

    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.status(httpStatus.UNPROCESSABLE_ENTITY).json({message: 'Wrong credential'});
        } else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    var token = jwt.encode(user, config.secret);
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({message: 'Wrong credential'});
                }
            });
        }
    });
});

module.exports = sessionRouter;
