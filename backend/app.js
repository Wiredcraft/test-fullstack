var express = require('express');
var cors = require('cors');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var config = require('./config/main');
var httpStatus = require('http-status-codes');
var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// passport config
app.use(passport.initialize());
require('./config/passport')(passport);

// database connection
mongoose.connect(config.database);

// Routers
var userRouter = require('./routes/userRouter');
var talkRouter = require('./routes/talkRouter');
var sessionRouter = require('./routes/sessionRouter');
app.use('/user/', userRouter);
app.use('/talk/', talkRouter);
app.use('/session', sessionRouter);

app.get('/', function (req, res) {
    res.json({
        success: true,
        message: 'The API is working!'
    });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = httpStatus.NOT_FOUND;
    next(err);
});

// error handlers
app.use(function (err, req, res, next) {
    res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR);
    res.json({
        message: err.message
    });
});

module.exports = app;
