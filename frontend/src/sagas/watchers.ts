/* eslint-disable @typescript-eslint/explicit-function-return-type */
// Disabling eslint `explicit-function-return-type` linting rule
// as it does not handle well `function*`.

import {api} from '../actions';
import sagas from './api';
import {takeLatest} from 'redux-saga/effects';

/**
 * Worker which watch for user authentication (login, register) events.
*/
export function* watchUserAuthentication() {
  yield takeLatest(
      api.authentication.login.API_LOGIN_USER_STARTED,
      sagas.loginSaga,
  );
  yield takeLatest(
      api.authentication.register.API_REGISTER_USER_STARTED,
      sagas.registerSaga,
  );

  yield takeLatest(
      api.talks.API_TALKS_LIST_STARTED,
      sagas.listTalksSaga,
  );

  yield takeLatest(
      api.authentication.login.API_LOGIN_USER_STARTED,
      sagas.loginSaga,
  );

  yield takeLatest(
      api.authentication.register.API_REGISTER_USER_STARTED,
      sagas.registerSaga,
  );

  yield takeLatest(
      api.talks.API_TALKS_DELETE_STARTED,
      sagas.deleteTalksSaga,
  );

  yield takeLatest(
      api.talks.API_TALKS_GET_STARTED,
      sagas.getTalksSaga,
  );


  yield takeLatest(
      api.talks.API_TALKS_PATCH_STARTED,
      sagas.patchTalksSaga,
  );

  yield takeLatest(
      api.talks.API_TALKS_POST_STARTED,
      sagas.postTalksSaga,
  );

  yield takeLatest(
      api.vote.API_VOTE_POST_STARTED,
      sagas.postVoteSaga,
  );
}
