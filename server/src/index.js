const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const { router } = require('./router');
const { errorHandler, onError } = require('./middlewares/error-handler');

const app = new Koa();
app.on('error', onError);
app.use(errorHandler);
app.use(bodyParser());

app.use(router.routes(), router.allowedMethods());

module.exports.app = app;
