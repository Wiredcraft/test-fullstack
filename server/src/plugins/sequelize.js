"use strict";
const { mysql } = require("../config/config.json");
const Sequelize = require("sequelize");

const clients = new Map();

const client = new Sequelize({
  ...mysql,
});
clients.set("test", client);

exports.clients = clients;
