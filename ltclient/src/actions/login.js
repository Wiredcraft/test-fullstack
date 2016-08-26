import { commonFetch } from '../utils';
import { showError } from './error';

const apiEndpoint = 'http://localhost:3000/api/';

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
    userId: json.userId,
  };
}

function failToken() {
  return {
    type: 'FAIL_TOKEN',
  };
}

function login(user) {
  return dispatch => {
    dispatch(requestToken());
    return commonFetch(`${apiEndpoint}AppUsers/login?include=user`, 'POST', user)
      .then(res => res.json())
      .then(json => dispatch(receiveToken(user, json)))
      .catch(err => {
        showError(dispatch, err.message);
        dispatch(failToken());
      });
  };
}

export { login };
