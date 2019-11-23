const Router = require('@koa/router');
const services = require('./services');

const talks = new Router();

talks.get('/', ctx => {
  ctx.body = services.listTalks();
});

talks.post('/', ctx => {
  const talk = ctx.request.body;

  ctx.body = services.createTalk(talk);
});

module.exports.talks = talks;
