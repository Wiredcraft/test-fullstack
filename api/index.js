require('dotenv').config();
const firebase = require("firebase/app");

const firebaseConfig = require('./firebaseConfig');

const project = firebase.initializeApp(firebaseConfig);

// const auth = require("firebase/auth");
// const database = require("firebase/database");

const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send(project.name);
});

app.listen(+process.env.PORT);
console.log(`Listening on port ${process.env.PORT}...`);
