const Router = require('@koa/router');
const services = require('./services');

const talks = new Router();

talks.get('/', async ctx => {
  const { orderBy, asc } = ctx.request.query;

  ctx.body = await services.listTalks({
    orderBy,
    asc: asc === 'true' ? true : false
  });
});

talks.post('/', async ctx => {
  const talk = ctx.request.body;

  ctx.body = await services.createTalk(talk);
});

talks.put('/:id/vote', async ctx => {
  const postId = ctx.params.id;
  const userId = 0; // TODO: Fix me
  ctx.body = await services.voteTalk(postId, userId);
});

talks.put('/:id/unvote', async ctx => {
  const postId = ctx.params.id;
  const userId = 0; // TODO: Fix me
  ctx.body = await services.unVoteTalk(postId, userId);
});

module.exports.talks = talks;
