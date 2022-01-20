'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const authrorize = app.middlewares.authorize();

  app.router.get('/api/login', app.controller.api.login);
  app.router.get('/api/register', app.controller.api.login);
  app.router.get('/api/logout', app.controller.api.logout);

  app.router.get('/api/talk/list', app.controller.api.listTalk )
  app.router.post('/api/talk/add', authrorize, app.controller.api.addTalk);
  app.router.post('/api/talk/vote', authrorize, app.controller.api.voteTalk);
  app.router.post('/api/talk/unvote', authrorize, app.controller.api.unvoteTalk);
};
