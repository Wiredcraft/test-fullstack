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
  if (!json.id) {
    throw new Error('Unable to login, is your username/password correct?');
  }

  return {
    type: 'RECEIVE_TOKEN',
    token: json.id,
    username: json.user.username, // FIXME user may use email to login
    userid: json.userId,
  };
}

function failToken() {
  return {
    type: 'FAIL_TOKEN',
  };
}

function displayError(message) {
  return {
    type: 'DISPLAY_ERROR',
    message,
  };
}

function dismissError() {
  return {
    type: 'DISMISS_ERROR',
  };
}

function showError(dispatch, message, timeout) {
  timeout = timeout || 3000;
  dispatch(displayError(message));
  setTimeout(() => {
    dispatch(dismissError());
  }, timeout);
}

function login(user) {
  return dispatch => {
    dispatch(requestToken());
    return commonFetch(apiEndpoint + 'AppUsers/login?include=user', 'POST', user)
      .then(res => res.json())
      .then(json => dispatch(receiveToken(user, json)))
      .catch(err => {
        showError(dispatch, err.message);
        dispatch(failToken());
      });
  };
}

export { login };
