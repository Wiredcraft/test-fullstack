require('dotenv').config({ path: '.env' });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const configureDb = require('./config/database');
const configurePassport = require('./config/passport');
const configureRoutes = require('./config/routes');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport Config
configurePassport(app, passport);

// DB Config
const db = require('./config/default').mongoURI;
configureDb(db);

// Use Routes
configureRoutes(app, passport);

app.options('*', cors());
app.use(cors({ 'credentials': false, 'origin': '*' }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Temp Sample
const url = 'http://localhost:9000';

app.use('/api', createProxyMiddleware({ target: url, changeOrigin: true }));

const port = process.env.PORT || 9000;
app.listen(port, () => console.log('Server Started'));