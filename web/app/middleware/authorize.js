const jwt = require('jsonwebtoken');
const AuthenticationError = require('../error/AuthenticationError');

module.exports = (options, app) => {
    return async (ctx, next) => {
        const token = ctx.request.headers["token"];
        try {
            ctx.user = jwt.verify(token, app.config.app.keys);
            await next();
        } catch(error) {
            if (ctx.request.headers["x-requested-with"] == 'XMLHttpRequest') {
                throw new AuthenticationError('Please login before you operate');
            } else {
                ctx.redirect('/login');
            }
        }
    }
}