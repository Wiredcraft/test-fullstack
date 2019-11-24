const Router = require('@koa/router');
const queryString = require('query-string');
const { CONFIG } = require('../../config');
const { getUserByCode } = require('./services/oauth-github');
const { createAuthToken } = require('./services/authorization');

const login = new Router();

login.get('/oauth/github', async ctx => {
  const baseUrl = 'https://github.com/login/oauth/authorize';
  const state = Math.floor(Math.random() * 100000000000000);
  const params = {
    client_id: CONFIG.oauth.github.clientId,
    scope: 'user:email',
    state
  };
  const query = queryString.stringify(params);
  const url = `${baseUrl}?${query}`;
  ctx.redirect(url);
});

login.get('/oauth/callback', async ctx => {
  const { code, state } = ctx.query;
  // TODO: Verify state
  const user = await getUserByCode(code, state);

  const url = `${
    CONFIG.oauth.frontendRedirectUri
  }/sign-in?accessToken=${createAuthToken(user.login)}`;

  ctx.redirect(url);
});

module.exports.login = login;
