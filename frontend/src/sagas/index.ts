/* eslint-disable @typescript-eslint/explicit-function-return-type */
// Disabling eslint `explicit-function-return-type` linting rule
// as it does not handle well `function*`.

import {fork} from 'redux-saga/effects';
import {watchUserAuthentication} from './watchers';

/**
 * Spawn a worker which watch for user authentication events.
*/
export default function* startForman() {
  yield fork(watchUserAuthentication);
}
