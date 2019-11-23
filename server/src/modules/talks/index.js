const Router = require('@koa/router');
const services = require('./services');

const talks = new Router();

talks.get('/', async ctx => {
  ctx.body = await services.listTalks();
});

talks.post('/', async ctx => {
  const talk = ctx.request.body;

  ctx.body = await services.createTalk(talk);
});

module.exports.talks = talks;
