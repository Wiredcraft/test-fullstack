const Router = require('@koa/router');
const services = require('./services');
const { auth } = require('../../middlewares/authentication');

const talks = new Router();

talks.get('/', async ctx => {
  const { orderBy, asc } = ctx.query;

  ctx.body = await services.listTalks({
    orderBy,
    asc: asc === 'true' ? true : false
  });
});

talks.post('/', auth, async ctx => {
  const talk = ctx.request.body;
  const { username } = ctx.state.user;
  talk.author = username;

  ctx.body = await services.createTalk(talk);
});

talks.put('/:id/vote', auth, async ctx => {
  const postId = ctx.params.id;
  const userId = ctx.state.user.username;
  ctx.body = await services.voteTalk(postId, userId);
});

talks.put('/:id/unvote', auth, async ctx => {
  const postId = ctx.params.id;
  const userId = ctx.state.user.username;
  ctx.body = await services.unVoteTalk(postId, userId);
});

module.exports.talks = talks;
