const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const { router } = require('./router');
const { errorHandler } = require('./middlewares/error-handler');

const app = new Koa();
app.use(errorHandler);
app.use(bodyParser());

app.use(router.routes(), router.allowedMethods());

module.exports.app = app;
