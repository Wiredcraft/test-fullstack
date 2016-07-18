
module.exports = function(Model, options) {
  options.from = options.from || '**';

  Model.afterRemote(options.from, function(ctx, modelInstance, next) {
    if (ctx.result) {
      if (Array.isArray(ctx.result)) {
        ctx.result.forEach(function(result) {
          result.unsetAttribute('password')
        });
      }else {
        delete ctx.result.unsetAttribute('password');
      }
    }
    next();
  });
}
