'use strict';

module.exports = (options, app) => {
    return async (ctx, next) => {
        try {
            ctx.req.session = ctx.session;
            ctx.req.cookies = ctx.cookies;
            ctx.res.statusCode = 200;
            await next();
            if (ctx.request.headers["x-requested-with"] == 'XMLHttpRequest') {
                ctx.body = {
                    success: true,
                    data: ctx.body
                }
            }
        } catch(e) {
            ctx.body = {
                success: false,
                name: e.name || 'ApplicationError',
                message: e.message || '系统开小差了，请稍后重试',
                data: e.data
            }
        }
    }
}