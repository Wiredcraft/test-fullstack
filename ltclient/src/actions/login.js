import { commonFetch, saveState, clearState } from '../utils';
import { showError } from './error';
import { apiEndpoint } from '../constants';

function requestToken() {
  return {
    type: 'REQUEST_TOKEN',
  };
}

function receiveToken(user, json) {
  if (!json.id) {
    throw new Error('Unable to login, is your username/password correct?');
  }

  saveState({
    username: json.user.username,
    userId: json.userId,
    token: json.id,
    loginAt: new Date(),
    ttl: json.ttl,
  });

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

function startLogout() {
  clearState();
  return {
    type: 'START_LOGOUT',
  };
}

function logout() {
  return (dispatch, getState) => {
    const { token } = getState().user;
    if (!token) {
      // we should nevel run this block of code
      return showError(dispatch, 'You are not logged-in');
    }
    dispatch(startLogout());
    dispatch({
      type: 'CLEAN_USERVOTEDTALKS',
    });
    return commonFetch(`${apiEndpoint}AppUsers/logout?access_token=${token}`, 'POST', {})
      // .then(() => dispatch(doneLogout()))
      .catch(err => {
        showError(dispatch, err.message);
        // dispatch(failLogout());
      });
  };
}

export { login, logout };
