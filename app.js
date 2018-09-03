let express = require('express');
let http = require('http');
let path = require('path');
let logger = require('morgan');
let bodyParser = require('body-parser');

let routes = require('./routes/index');
let users = require('./routes/users');
let signup = require('./routes/signup');
let login = require('./routes/login');
let checkAuth = require('./routes/checkAuth').router;
let topic = require('./routes/topic');

let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if (app.get('env') === 'production') {
  app.use(logger('combined'))
} else {
  app.use(logger('dev'))
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


let server = http.createServer(app);
app.use('/HN/public', express.static(path.join(__dirname, 'public')));
server.listen(8080);
console.log('server started on port 8080');

app.use('/HN', routes);
app.use('/HN/users', users);
app.use('/HN/signup', signup);
app.use('/HN/login', login);
app.use('/HN/checkAuth', checkAuth);
app.use('/HN/topic', topic);

app.use('/HN/*', routes); // catch-all routes

app.get('*', (req, res) => {
  console.log("catch all handler: ", req.url);
  res.render('notFound', { title: 'Express' });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
