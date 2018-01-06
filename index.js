#!/usr/bin/env nodejs

/**
 * Express is used for routing
 */
const express = require('express');
const app = express();

/**
 * Mongoose is used to communicate with MongoDB
 */
const mongoose = require('mongoose');

/**
 * Render main html page
 */
app.get('/', function (req, res) {
	res.sendFile(__dirname+'/index.html');
});

/**
 * Serve static files
 */
app.use('/dist', express.static('dist'));

const port = 3001;
app.listen(port);

console.log('Server is running on port '+port);