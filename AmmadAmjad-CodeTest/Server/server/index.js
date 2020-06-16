const express = require('express');
const userRoutes = require('../endpoints/user/routes');
const commentRoutes = require('../endpoints/comments/routes');
const db = require('../controllers/db.js');
const middleware = require('../controllers/middleware.js')(db);

const server = express();
server.use(express.json());

server.use('/', userRoutes);
server.use('/', commentRoutes);

server.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods",
		"GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE");
	res.header("Access-Control-Allow-Headers",
		"Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,Keep-Alive,X-Requested-With,If-Modified-Since,name,type"
	);
	next();
});

server.use(middleware.logger);
server.use(express.urlencoded());

module.exports = server;