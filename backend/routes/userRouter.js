var express = require('express');
var jwt = require('jwt-simple');
var httpStatus = require('http-status-codes');
var config = require('../config/main');
var User = require('../models/user');
var userRouter = express.Router();


userRouter.post('/', function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.status(httpStatus.BAD_REQUEST).json({message: 'username, password required'});
        return;
    }

    var newUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    newUser.save(function (err, user) {
        if (err) {
            res.status(httpStatus.UNPROCESSABLE_ENTITY).json({message: 'username existed'});
            return;
        }

        var userObject = user.toObject();
        delete userObject.password;
        res.status(httpStatus.CREATED).json(userObject);
    });

});

module.exports = userRouter;
