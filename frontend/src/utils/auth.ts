/* eslint-disable require-jsdoc */

import {checkCookie, getCookie} from './cookies';

function isAuthenticated(): boolean {
  return checkCookie() !== null &&
    getCookie('token') !== null &&
    getCookie('user') !== null;
}

export {isAuthenticated};
