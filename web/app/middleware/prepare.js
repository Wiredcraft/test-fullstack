'use strict';

module.exports = (options, app) => {
    return async (ctx, next) => {
        try {
            ctx.res.statusCode = 200;
            await next();
            if (ctx.request.headers["x-requested-with"] == 'XMLHttpRequest') {
                ctx.body = {
                    success: true,
                    data: ctx.body
                }
            }
        } catch(error) {
            if (error.name == 'AuthenticationError') {
                ctx.res.statusCode = 401;
            } else {
                ctx.res.statusCode = 500;
            }
            ctx.body = {
                success: false,
                name: error.name || 'ApplicationError',
                message: error.message,
                data: error.data
            }
        }
    }
}