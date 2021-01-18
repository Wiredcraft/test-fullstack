import { all } from 'redux-saga/effects';
import { userSagaWatchers } from './users';
import { pollSagaWatchers } from './polls';


export default function* sagas() {
  yield all([
    ...userSagaWatchers,
    ...pollSagaWatchers
  ]);
};
