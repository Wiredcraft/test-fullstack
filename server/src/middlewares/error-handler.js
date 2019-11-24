const { CODE } = require('../errors/code-table');

const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = 500; // Default status code

    if (err.code) {
      const errCodeItem = CODE[err.code];
      if (errCodeItem) {
        if (!err.message) err.message = errCodeItem.message;
        ctx.status = errCodeItem.status;
      }
    }

    console.error('error', ctx.request.url);
    console.error(err);

    ctx.body = {
      code: err.code,
      message: err.message,
      error: err.data
    };
  }
};

module.exports.errorHandler = errorHandler;
