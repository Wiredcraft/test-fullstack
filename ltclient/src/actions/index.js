import fetch from 'isomorphic-fetch';

let apiEndpoint = 'http://localhost:3000/api/';

function commonFetch(url, method, data) {
  let opt = {};
  opt.method = method || 'GET';
  opt.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  if (data) {
    opt.body = JSON.stringify(data);
  }

  return fetch(url, opt);
}

function requestToken() {
  return {
    type: 'REQUEST_TOKEN',
  };
}

function receiveToken(user, json) {
  return {
    type: 'RECEIVE_TOKEN',
    token: json.id,
    username: user.username, // FIXME user may use email to login
    userid: json.userId,
  };
}

function login(user) {
  return dispatch => {
    dispatch(requestToken());
    return commonFetch(apiEndpoint + 'AppUsers/login', 'POST', user)
      .then(res => res.json())
      .then(json => dispatch(receiveToken(user, json)));
  };
}

export { login };
