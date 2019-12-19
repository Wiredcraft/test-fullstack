import { call, put, takeLatest } from 'redux-saga/effects';
import * as talksService from '../../services/talksService';
import * as globalService from '../../services/globalService';

export function* get() {
  const talks = yield call(talksService.get);
  if (talks) {
    yield put({ type: 'talks/save', payload: talks });
  }
}

export function* like({ payload }) {
  const talk = yield call(talksService.like, payload);
  if (talk) {
    yield put({ type: 'talks/get' });
  }
}

export function* create({ payload }) {
  const talk = yield call(talksService.create, payload);
  if (talk) {
    yield call(globalService.nav, { url: '/list' });
  }
}

export default function* talksSaga() {
  yield takeLatest('talks/get', get);
  yield takeLatest('talks/like', like);
  yield takeLatest('talks/create', create);
}
