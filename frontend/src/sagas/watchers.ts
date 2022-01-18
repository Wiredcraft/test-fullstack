
import {loginSaga, registerSaga} from './api';
import {api} from '../actions';
import {takeLatest} from 'redux-saga/effects';

/**
 * Worker which watch for user authentication (login, register) events.
*/
export function* watchUserAuthentication() {
  yield takeLatest(
      api.authentication.login.API_LOGIN_USER_STARTED,
      loginSaga,
  );
  yield takeLatest(
      api.authentication.register.API_REGISTER_USER_STARTED,
      registerSaga,
  );
}
