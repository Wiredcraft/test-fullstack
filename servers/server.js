
const express = require('express');
const session = require('express-session')
const app = express();


const sess = {
  secret: 'hacker news clone',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1);
  sess.cookie.secure = true;
}

app.use(session(sess));

const router = require('./route');
router.setup(app, express);
