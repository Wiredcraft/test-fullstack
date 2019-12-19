import { all } from 'redux-saga/effects';
import talksEffect from './talksEffect';
import userEffect from './userEffect';

const effects = [talksEffect(), userEffect()];

export default function* rootSaga() {
  yield all(effects);
}
