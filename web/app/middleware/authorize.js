'use strict';

module.exports = (options, app) => {
    return async (ctx, next) => {
        if (ctx.session.user) {
            await next();
        } else {
            if (ctx.request.headers["x-requested-with"] == 'XMLHttpRequest') {
                throw Object.assign(new Error(), {
                    name: "AuthenticationError",
                    message: "请登录后再进行操作"
                })
            } else {
                ctx.redirect('/login');
            }
        }
    }
}