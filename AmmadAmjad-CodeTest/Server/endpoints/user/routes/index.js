const {Router} = require('express');
const app = Router();
const underscore = require('underscore');
const db = require('../../../controllers/db.js');
const middleware = require('../../../controllers/middleware.js')(db);



// USER REGISTER
app.post('/user/register', function (req, res , next) {
    var body = underscore.pick(req.body, 'email', "name", "password");
    db.user.create(body)
    .then(function (user) {
            res.json({
                message: "User registered successfully",
                user: user.toPublicJSON()
            });
        })
        .catch(function (e) {
            next(e);
        });
});

// USER LOGIN
app.post('/user/login', function (req, res, next) {
    const body = underscore.pick(req.body, 'email', 'password');
    var token, userInstance;
    db.user.authenticate(body)
    .then(function (user) {
            userInstance = user;
            token = user.generateToken('authentication');
            return db.user.update({
                token: token
            }, {
                where: {
                    id: user.id
                }
            });
        })
        .then(function (u) {
            res.header('Authentication', token)
            var user = userInstance.toPublicJSON();
            user.token = token
            res.json({
                message: "Login successful",
                user: user
            })
        })
        .catch(function (e) {
            console.log(e);
            
            next(e);
        });
});

// USER LOGOUT
app.delete('/user/logout', middleware.requireAuthentication, function (req, res , next) {
    db.user.update({
        token: '',
        tokenHash: ''
    }, {
        where: {
            id: req.user.id
        }
    })
    .then(function (user) {
        res.json({
            message: 'Logged out successfully'
        })
    })
    .catch(function (e) {
        next(e);
    });
});

module.exports = app;