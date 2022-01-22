const AuthenticationError = require('../error/AuthenticationError');

module.exports = (options, app) => {
    return async (ctx, next) => {
        if (ctx.user) {
            await next();
        } else {
            if (ctx.request.headers["x-requested-with"] == 'XMLHttpRequest') {
                throw new AuthenticationError('Please login before you operate');
            } else {
                ctx.redirect('/login');
            }
        }
    }
}