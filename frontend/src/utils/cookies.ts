import {IAPIResponse} from 'src/interfaces/IAPI';

/**
 * Set a cookie in the browser with the
 * given name, value, and expiration date.
  * @param {string} cookieName - Cookie name
  * @param {string} cookieValue - Cookie value
  * @param {number} daysToExpire - Number of days to expire the cookie
 */
export function setCookie(
    cookieName: string,
    cookieValue: string,
    daysToExpire: number,
) {
  const date = new Date();
  date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
  const expires = 'expires=' + date.toUTCString();
  document.cookie = cookieName + '=' + cookieValue + ';' + expires + ';path=/';
}

/**
  * Get a cookie in the browser from a given name.
  * @param {string} cookieName - Cookie name
  * @return {string} - Cookie value
 */
export function getCookie(cookieName: string): string {
  const name = cookieName + '=';
  const ca = document.cookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return '';
}

/**
  * Check if cookie are fully initialized.
  * @return {IAPIResponse} - True if cookie are initialized
 */
export function checkCookie(): IAPIResponse | null {
  const username: string = getCookie('username');
  const token: string = getCookie('token');
  const id: string = getCookie('id');
  if (username && username !== '' && token && token !== '' && id && id !== '') {
    return {username, token, id};
  } else {
    return null;
  }
}

/**
  * Clear a specific cookie in the browser by a given name.
  * @param {string} cookieName - Cookie name
 */
export function clearCookie(cookieName: string) {
  setCookie(cookieName, '', -1);
}
