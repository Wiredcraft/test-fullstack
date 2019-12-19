import { call, takeLatest } from 'redux-saga/effects';
import queryString from 'query-string';
import * as userService from '../../services/userService';
import * as globalService from '../../services/globalService';

function* login({ payload }) {
  const token = yield call(userService.login, payload);
  if (token) {
    yield call(userService.saveToken, token);
    const { fallback: url = '/list' } = queryString.parse(window.location.search);
    yield call(globalService.nav, { url });
  }
}

export default function* userSaga() {
  yield takeLatest('user/login', login);
}
