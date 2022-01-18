/* eslint-disable require-jsdoc */

import {checkCookie} from './cookies';

function checkAuth(): boolean {
  const isAuth = checkCookie();

  return isAuth !== null;
}

export {checkAuth};
