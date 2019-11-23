const { CODE } = require('../errors/code-table');

const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.code) {
      const errCodeItem = CODE[err.code];
      if (errCodeItem) {
        if (!err.message) err.message = errCodeItem.message;
        ctx.status = errCodeItem.status;
      }
    }

    console.error(err);
    return (ctx.body = {
      code: err.code,
      message: err.message,
      error: err.data
    });
  }
};

module.exports.errorHandler = errorHandler;
