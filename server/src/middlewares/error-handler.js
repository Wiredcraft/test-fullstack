const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    return (ctx.body = {
      code: err.code,
      message: err.message,
      error: err.data
    });
  }
};

module.exports.errorHandler = errorHandler;
