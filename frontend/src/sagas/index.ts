
import {fork} from 'redux-saga/effects';
import {watchUserAuthentication} from './watchers';

/**
 * Spawn a worker which watch for user authentication events.
*/
export default function* startForman() {
  yield fork(watchUserAuthentication);
}
