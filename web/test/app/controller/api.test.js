'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/api.test.js', () => {
  it('should assert', () => {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it('GET /api/talk/page', () => {
    return app.httpRequest()
      .get('/api/talk/page')
      .expect(200)
      .expect(res => {
        assert(res.body.success !== false);
      })
  });

  it('POST /api/register', () => {
    return app.httpRequest()
      .post('/api/register')
      .send({ name: 'test', password: 'test'})
      .expect(200)
      .expect(res => {
        assert(res.body.success !== false);
      })
  });

  it('POST /api/login', () => {
    return app.httpRequest()
      .post('/api/login')
      .send({ name: 'test', password: 'test'})
      .expect(200)
      .expect(res => {
        assert(res.body.success !== false);
      })
  });

  it('POST /api/talk/add', () => {
    return app.httpRequest()
      .post('/api/talk/add')
      .set('Authorization', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFtcWZuODhoNWFpa3lxOWo1aXkiLCJuYW1lIjoiZnMiLCJpYXQiOjE2NDI4ODIwMTIsImV4cCI6MTY0Mjk2ODQxMn0.0Tgd8yXA9sONw-umA0ZvQMWjJfpZCK8gTX_gwPjSTEM")
      .send({ title: 'this is a test title', description: 'This is a test desc' })
      .expect(res => {
        assert(res.body.success !== false);
      })
  });

  it('POST /api/talk/vote', () => {
    return app.httpRequest()
      .post('/api/talk/vote')
      .set('Authorization', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFtcWZuODhoNWFpa3lxOWo1aXkiLCJuYW1lIjoiZnMiLCJpYXQiOjE2NDI4ODIwMTIsImV4cCI6MTY0Mjk2ODQxMn0.0Tgd8yXA9sONw-umA0ZvQMWjJfpZCK8gTX_gwPjSTEM")
      .send({ talk: '', voteBy: '' })
      .expect(res => {
        assert(res.body.success !== false);
      })
  });
});
