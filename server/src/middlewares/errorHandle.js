"user strict";
const { CommonService } = require("../services/common");

module.exports = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      ctx.response.status = error.statusCode || error.status || 500;
      const errorCode = error.code || ctx.response.status;
      ctx.body = CommonService.responseData(
        undefined,
        ctx.response.status,
        errorCode,
        error.message
      );
    }
  };
};
