/* eslint-disable require-jsdoc */

export function setCookie(
    cookieName: string,
    cookieValue: string,
    daysToExpire: number,
) {
  const d = new Date();
  d.setTime(d.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
  const expires = 'expires=' + d.toUTCString();
  document.cookie = cookieName + '=' + cookieValue + ';' + expires + ';path=/';
}

export function getCookie(cookieName: string) {
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

export function checkCookie() {
  const username: string = getCookie('username');
  const token: string = getCookie('token');
  if (username !== '' || token !== '') {
    return {username, token};
  } else {
    return null;
  }
}

export function clearCookie(cookieName: string) {
  setCookie(cookieName, '', -1);
}
