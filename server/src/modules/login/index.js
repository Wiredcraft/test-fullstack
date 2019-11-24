const Router = require('@koa/router');
const queryString = require('query-string');
const { CONFIG } = require('../../config');
const { getUserByCode } = require('./services/oauth-github');
const { createAuthToken } = require('../../utils/authorization');

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
  const accessToken = createAuthToken(user.login);

  // // Save access token in cookie
  // // Predefined keys to prevent client side front modifying
  // const cookies = new Cookies(ctx.req, ctx.res, ['accessToken']);
  // cookies.set('accessToken', accessToken, {
  //   sameSite: 'lax',
  //   signed: false // TODO: Try sign it
  // });

  const url = `${CONFIG.frontend.baseUrl}${CONFIG.frontend.signInPage}?accessToken=${accessToken}`;
  // const url = `${CONFIG.frontend.baseUrl}${CONFIG.frontend.signInPage}`;

  ctx.redirect(url);
});

login.get('/me', async ctx => {
  this.body = ctx.state.user;
});

module.exports.login = login;
