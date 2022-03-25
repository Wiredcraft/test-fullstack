"use strict";
const Joi = require("joi");

exports.reg = {
  body: {
    username: Joi.string().required(),
    password: Joi.string().required(),
  },
};
