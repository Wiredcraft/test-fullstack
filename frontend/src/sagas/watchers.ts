/* eslint-disable require-jsdoc */
import {loginSaga, registerSaga} from './api';
import {authentification} from '../actions';
import {takeLatest} from 'redux-saga/effects';

export function* watchUserAuthentication() {
  yield takeLatest(
      authentification.login.LOGIN_USER_STARTED,
      loginSaga,
  );
  yield takeLatest(
      authentification.register.REGISTER_USER_STARTED,
      registerSaga,
  );
}
