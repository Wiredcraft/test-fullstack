import { call, put, fork, select, takeLatest } from 'redux-saga/effects';
import { SubmissionError, reset } from 'redux-form';
import history from '../history';
import { getAuthedUser } from '../users';
import { pollRequestActions, getPollsApi, postPollApi, updatePollVoteApi } from '../polls';
import * as TYPES from '../constants';


//=====================================================
//  SAGAS

export function* getPollsSaga() {
  try {
    const response = yield call(getPollsApi);
    yield put(pollRequestActions.getFulfilled({
      polls: response.polls
    }));
  } catch (error) {
    yield put(pollRequestActions.getFailed(error));
  }
};

export function* postPollSaga(action) {
  const { title, votes, resolve, reject } = action.payload;
  try {
    let authedUser = yield select(getAuthedUser);
    const user = (!!authedUser ? authedUser : { name: 'public', cuid: 'public' });
    const response = yield call(postPollApi, {
      title,
      votes,
      user_id: user.cuid,
      user_name: user.name
    });
    yield put(pollRequestActions.postFulfilled({
      poll: response.poll,
      message: response.message
    }));
    yield put(reset('newPoll'));
    yield call(resolve);
  } catch (error) {
    yield put(pollRequestActions.postFailed(error));
    yield call(reject, (new SubmissionError(error)));
  }
};

export function* postPollSuccessSaga() {
  yield history.push('/');
};

export function* updatePollVoteSaga(action) {
  // TODO
  // Use more simple way to alter vote count
  const { vote, resolve, reject } = action.payload;
  try {
    const authedUser = yield select(getAuthedUser);
    const user = (!!authedUser ? authedUser : { name: 'public', cuid: 'public' });
    const activePoll = yield select(getActivePoll);
    const response = yield call(updatePollVoteApi,
      activePoll.cuid,
      {
        voterId: user.cuid,
        votes: vote
      }
    );
    yield put(pollRequestActions.updateFulfilled({
      poll: response.poll,
      message: response.message
    }));
    yield put(reset('votePoll'));
    yield call(resolve);
  } catch(error) {
    yield put(pollRequestActions.updateFailed(error));
    yield call(reject, (new SubmissionError(error)));
  }
};


//=====================================================
//  WATCHERS

export function* watchGetPollsSaga() {
  yield takeLatest(TYPES.GET_POLLS, getPollsSaga);
};

export function* watchPostPollSaga() {
  yield takeLatest(TYPES.POST_POLL, postPollSaga);
};

export function* watchPostPollSuccessSaga() {
  yield takeLatest(TYPES.POST_POLL_SUCCESS, postPollSuccessSaga);
};

export function* watchUpdatePollVoteSaga() {
  yield takeLatest(TYPES.UPDATE_POLL_VOTE, updatePollVoteSaga);
};


//=====================================================
//  WATCHERS AND SAGAS

export const pollSagas = {
  watchGetPollsSaga,
  watchPostPollSaga,
  watchPostPollSuccessSaga,
  watchUpdatePollVoteSaga,
  getPollsSaga,
  postPollSaga,
  postPollSuccessSaga,
  updatePollVoteSaga
};


//=====================================================
//  FORKED SAGA WATCHERS

export const pollSagaWatchers = [
  fork(watchGetPollsSaga),
  fork(watchPostPollSaga),
  fork(watchPostPollSuccessSaga),
  fork(watchUpdatePollVoteSaga),
];
