"use strict";
const Joi = require("joi");

exports.reg = {
  body: {
    title: Joi.string().required(),
    content:Joi.string(),
    authorName: Joi.string().required(),
    rankCount:Joi.number()
  },
};
