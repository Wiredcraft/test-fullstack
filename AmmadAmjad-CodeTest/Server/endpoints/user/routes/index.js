const {Router} = require('express');
const app = Router();
const underscore = require('underscore');
const db = require('../../../controllers/db.js');
const middleware = require('../../../controllers/middleware.js')(db);



// USER REGISTER
app.post('/user/register', function (req, res) {
    var body = underscore.pick(req.body, 'email', "name", "password");
    db.user.create(body).then(function (user) {
            res.json({
                message: "User registered successfully",
                user: user.toPublicJSON()
            })

        })
        .catch(function (e) {
            res.status(403).json({
                message: "Failed to register user",
                error: String(e)
            })
        });
});

// USER LOGIN
app.post('/user/login', function (req, res) {
    const body = underscore.pick(req.body, 'email', 'password');
    var token, userInstance;
    db.user.authenticate(body).then(function (user) {
            userInstance = user;
            token = user.generateToken('authentication');
            return db.user.update({
                token: token
            }, {
                where: {
                    id: user.id
                }
            });
        }).then(function (u) {
            res.header('Authentication', token)
            var user = userInstance.toPublicJSON();
            user.token = token
            res.json({
                message: "Login successful",
                user: user
            })
        })
        .catch(function (e) {
            res.status(404).json({
                message: "Failed to login",
                error: String(e)
            })
        });
});

// USER LOGOUT
app.delete('/user/logout', middleware.requireAuthentication, function (req, res) {
    db.user.update({
        token: '',
        tokenHash: ''
    }, {
        where: {
            id: req.user.id
        }
    }).then(function (user) {
        res.json({
            message: 'Logged out successfully'
        })
    }).catch(function (e) {
        res.status(401).json({
            message: "Failed to logout",
            error: e.errors[0].message || e.message || String(e)
        })
    });
});

module.exports = app;