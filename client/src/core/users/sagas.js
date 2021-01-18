import { call, put, fork, select, takeLatest } from 'redux-saga/effects';
import { SubmissionError, reset } from 'redux-form';
import history from '../history';
import {
  userRequestActions,
  getAuthedUser,
  authUserApi
 } from '../users';
import * as TYPES from '../constants';


//=====================================================
//  SAGAS

export function* authUserSaga(action) {
  const { authType, name, password, resolve, reject } = action.payload;
  console.log(action.payload)
  try {
    const response = yield call(authUserApi, authType, { name, password });
    yield put(userRequestActions.authFulfilled({
      user: response.user,
      message: response.message
    }));
    yield call(resolve);
    yield put(reset('authUser'));
  } catch (error) {
    yield put(userRequestActions.authFailed(error));
    yield call(reject, (new SubmissionError(error)));
  }
};

export function* authUserSuccessSaga() {
  const authedUser = select(getAuthedUser);
  if (!!authedUser) {
    yield localStorage.setItem('token', authedUser.token);
    yield history.push('/');
  }
};

export function* logoutUserSaga() {
  yield localStorage.removeItem('token');
  yield history.push('/');
};


//=====================================================
//  WATCHERS

export function* watchAuthUserSaga() {
  yield takeLatest(TYPES.AUTH_USER, authUserSaga);
};

export function* watchAuthUserSuccessSaga() {
  yield takeLatest(TYPES.AUTH_USER_SUCCESS, authUserSuccessSaga);
};

export function* watchLogoutUserSaga() {
  yield takeLatest(TYPES.RESET_AUTHED_USER, logoutUserSaga);
};

//=====================================================
//  WATCHERS AND SAGAS

export const userSagas = {
  watchAuthUserSaga,
  watchAuthUserSuccessSaga,
  watchLogoutUserSaga,
  authUserSaga,
  authUserSuccessSaga,
  logoutUserSaga,
};


//=====================================================
//  FORKED SAGA WATCHERS

export const userSagaWatchers = [
  fork(watchAuthUserSaga),
  fork(watchAuthUserSuccessSaga),
  fork(watchLogoutUserSaga),
];
