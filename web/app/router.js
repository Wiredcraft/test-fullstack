'use strict';

const next = require('next');

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const nextApp = next({
    dev: process.env.NODE_ENV !== 'production',
    dir: __dirname 
  });
  const authrorize = app.middlewares.authorize();
  
  nextApp.prepare().then(() => {
    app.next = nextApp;

    app.router.get('/', app.controller.site.default);
    app.router.get('/guide', app.controller.site.default);
    app.router.get('/about', app.controller.site.default);
    app.router.get('/rule', app.controller.site.default);
    app.router.get('/corp', app.controller.site.default);
    app.router.get('/service', app.controller.site.default);
    app.router.get('/login', app.controller.site.login);
    app.router.get('/logout', app.controller.site.logout);
    app.router.get('/register', app.controller.site.register);
    app.router.get('/reset', app.controller.site.reset);
    app.router.get('/add', authrorize, app.controller.site.default);
    app.router.get('/append/:id', authrorize, app.controller.site.append);
    app.router.get('/topics', app.controller.site.default);
    app.router.get('/topic/:id', app.controller.site.topic);
    app.router.get('/post/:id', app.controller.site.post);
    app.router.get('/admin', authrorize, app.controller.site.admin);
    app.router.get('/user/:id', app.controller.site.user);
    app.router.get('/blocked/:type', app.controller.site.blocked);

    app.router.get('/api/layout', app.controller.api.layout);
    app.router.get('/api/suggest', app.controller.api.suggest);
    app.router.post('/api/upload', authrorize, app.controller.api.upload);

    app.router.post('/api/login', app.controller.api.login);
    app.router.post('/api/register', app.controller.api.register);
    app.router.post('/api/reset', app.controller.api.reset);
    app.router.post('/api/verify', app.controller.api.verify);

    app.router.get('/api/getTopic', app.controller.api.getTopic);
    app.router.get('/api/pageTopic', app.controller.api.pageTopic);

    app.router.get('/api/getPost', app.controller.api.getPost);
    app.router.get('/api/viewPost', app.controller.api.viewPost);
    app.router.get('/api/pagePost', app.controller.api.pagePost);
    app.router.post('/api/addPost', authrorize, app.controller.api.addPost);
    app.router.post('/api/appendPost', authrorize, app.controller.api.appendPost);

    app.router.post('/api/addReply', authrorize, app.controller.api.addReply);
    app.router.get('/api/pageReply', app.controller.api.pageReply);

    app.router.get('/api/blocked', app.controller.api.blocked);

    app.router.post('/api/relation', authrorize, app.controller.api.relation);
    app.router.post('/api/unrelation', authrorize, app.controller.api.unrelation);
    
    app.router.get('/api/getUser', app.controller.api.getUser);
    app.router.get('/api/readMessage', authrorize, app.controller.api.readMessage);
    app.router.get('/api/pageMessage', authrorize, app.controller.api.pageMessage);
    app.router.post('/api/uploadAvatar', authrorize, app.controller.api.uploadAvatar);
    app.router.post('/api/updateUserInfo', authrorize, app.controller.api.updateUserInfo);
    app.router.post('/api/updateUserAvatar', authrorize, app.controller.api.updateUserAvatar);
    app.router.post('/api/updateUserPassword', authrorize, app.controller.api.updateUserPassword);

    app.router.get('/api/topicWidget', app.controller.api.topicWidget);
    app.router.get('/api/postWidget', app.controller.api.postWidget);
    app.router.get('/api/statWidget', app.controller.api.statWidget);
    app.router.get('/api/userWidget', app.controller.api.userWidget);

    app.router.all('*', async ctx => {
      await nextApp.getRequestHandler()(ctx.req, ctx.res);
      ctx.respond = false
    })
  });
};