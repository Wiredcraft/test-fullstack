import 'whatwg-fetch';

const MIN = 60 * 1000;
const HOUR = MIN * 60;
const DAY = HOUR * 24;
const DAY3 = DAY * 3;

// return a friendly time
// '2016-08-24T06:50:06.018Z' => '3 hours ago'
function when(t) {
  let absolute = t;
  if (typeof t === 'string') absolute = new Date(t);
  const diff = new Date() - absolute;
  if (diff > DAY3) {
    return `on ${absolute.toLocaleDateString()}`;
  }
  if (diff > DAY) {
    return `${Math.floor(diff / DAY)} days ago`;
  }
  if (diff > HOUR) {
    return `${Math.floor(diff / HOUR)} hours ago`;
  }
  if (diff > MIN) {
    return `${Math.floor(diff / MIN)} minutes ago`;
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
