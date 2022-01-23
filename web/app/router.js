'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const authrorize = app.middlewares.authorize();

  app.router.post('/api/login', app.controller.api.login);
  app.router.post('/api/register', app.controller.api.register);

  app.router.get('/api/talk/page', app.controller.api.pageTalk);
  app.router.post('/api/talk/add', authrorize, app.controller.api.addTalk);
  app.router.post('/api/talk/vote', authrorize, app.controller.api.voteTalk);
};
