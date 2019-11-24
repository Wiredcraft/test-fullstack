const axios = require('axios');
const queryString = require('query-string');
const { CONFIG } = require('../../../config');

async function getAK(code, state) {
  console.log('getAK', code, state);
  const url = 'https://github.com/login/oauth/access_token';
  // const params = `client_id=${CONFIG.oauth.github.clientId}&client_secret=${CONFIG.oauth.github.clientSecret}&code=${code}`;
  const params = {
    client_id: CONFIG.oauth.github.clientId,
    client_secret: CONFIG.oauth.github.clientSecret,
    code,
    state
  };
  const query = queryString.stringify(params);
  const resp = await axios.get(`${url}?${query}`);

  console.log('resp.body', resp.data);
  const akData = queryString.parse(resp.data);
  return { accessToken: akData.access_token };
}

/**
 * ```javascript
 * const user = {
 *   login: "rankun203",
 *   id: 2988555,
 *   node_id: "MDQ6VXNlcjI5ODg1NTU=",
 *   avatar_url: "https://avatars1.githubusercontent.com/u/2988555?v=4",
 *   gravatar_id: "",
 *   url: "https://api.github.com/users/rankun203",
 *   html_url: "https://github.com/rankun203",
 *   followers_url: "https://api.github.com/users/rankun203/followers",
 *   following_url:
 *     "https://api.github.com/users/rankun203/following{/other_user}",
 *   gists_url: "https://api.github.com/users/rankun203/gists{/gist_id}",
 *   starred_url: "https://api.github.com/users/rankun203/starred{/owner}{/repo}",
 *   subscriptions_url: "https://api.github.com/users/rankun203/subscriptions",
 *   organizations_url: "https://api.github.com/users/rankun203/orgs",
 *   repos_url: "https://api.github.com/users/rankun203/repos",
 *   events_url: "https://api.github.com/users/rankun203/events{/privacy}",
 *   received_events_url: "https://api.github.com/users/rankun203/received_events",
 *   type: "User",
 *   site_admin: false,
 *   name: "Kun Ran",
 *   company: "Developer",
 *   blog: "https://blog.rankun.net",
 *   location: "My feet",
 *   email: "github@rankun.net",
 *   hireable: null,
 *   bio: "Love my life like I always do!",
 *   public_repos: 140,
 *   public_gists: 61,
 *   followers: 68,
 *   following: 348,
 *   created_at: "2012-12-07T11:09:01Z",
 *   updated_at: "2019-11-15T04:30:15Z"
 * };
 * ```
 */
async function getUser(ak) {
  console.log('ak', ak);
  const url = 'https://api.github.com/user';
  const resp = await axios.get(url, {
    headers: {
      Authorization: `token ${ak}`
    }
  });
  console.log(resp.data);
  return resp.data;
}

async function getUserByCode(code, state) {
  const { accessToken } = await getAK(code, state);
  return getUser(accessToken);
}

module.exports = { getAK, getUser, getUserByCode };
