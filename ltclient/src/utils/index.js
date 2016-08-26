import 'whatwg-fetch';

const MIN = 60 * 1000;
const HOUR = MIN * 60;
const DAY = HOUR * 24;
const DAY3 = DAY * 3;

// return a friendly time
// '2016-08-24T06:50:06.018Z' => '3 hours ago'
function when(t) {
  if (typeof t === 'string') t = new Date(t);
  t = new Date() - t;
  if (t > DAY3) {
    return `on ${t.toLocaleDateString()}`;
  }
  if (t > DAY) {
    return `${Math.floor(t / DAY)} days ago`;
  }
  if (t > HOUR) {
    return `${Math.floor(t / HOUR)} hours ago`;
  }
  if (t > MIN) {
    return `${Math.floor(t / MIN)} minutes ago`;
  }
  return 'just now';
}

function commonFetch(url, method, data) {
  const opt = {};
  opt.method = method || 'GET';
  opt.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (data) {
    opt.body = JSON.stringify(data);
  }

  return fetch(url, opt);
}

export { when, commonFetch };
