"use strict";

const Joi = require("joi");

exports.validate = (schema) => {
  const validateFunctions = {};
  if (schema.body) {
    const realSchema = Joi.object().keys(schema.body);
    validateFunctions.body = (ctx) => realSchema.validate(ctx.request.body);
  }

  return async function (ctx, next) {
    ctx.validateResult = {};
    for (let item of Object.keys(validateFunctions)) {
      const validateResult = validateFunctions[item](ctx);
      if (validateResult.error) {
        ctx.throw(400, "validate error!");
      }
    }
    return next();
  };
};
