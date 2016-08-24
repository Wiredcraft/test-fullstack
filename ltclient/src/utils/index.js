import fetch from 'isomorphic-fetch';

let MIN = 60 * 1000;
let HOUR = MIN * 60;
let DAY = HOUR * 24;
let DAY3 = DAY * 3;

// return a friendly time
// '2016-08-24T06:50:06.018Z' => '3 hours ago'
function when(t) {
  if (typeof t === 'string') t = new Date(t);
  t  = new Date() - t;
  if (t > DAY3) {
    return 'on ' + t.toLocaleDateString();
  } else if (t > DAY) {
    return Math.floor(t / DAY) + ' days ago';
  } else if ( t > HOUR) {
    return Math.floor(t / HOUR) + ' hours ago';
  } else if ( t > MIN) {
    return Math.floor(t / MIN) + ' minutes ago';
  } else {
    return 'just now';
  }
}

function commonFetch(url, method, data) {
  let opt = {};
  opt.method = method || 'GET';
  opt.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  if (data) {
    opt.body = JSON.stringify(data);
  }

  return fetch(url, opt);
}



export { when, commonFetch };