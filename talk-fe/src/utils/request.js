import CONFIG from '../config';

const { API } = CONFIG;

const checkStatus = response => {
  // http error handle
  return response;
};

const checkData = data => {
  // error
  if (data.statusCode) {
    throw data;
  }
  return data.data;
};
export default function request(url, option) {
  const options = {
    method: 'GET',
    ...option
  };

  const defaultOptions = {
    credentials: 'include'
  };
  const newOptions = { ...defaultOptions, ...options };
  let newURL = url;

  if (newOptions.method.toUpperCase() === 'GET' && newOptions.body) {
    const { body } = newOptions;
    newURL = `${url}?${Object.keys(body)
      .filter(_ => body[_])
      .map(k => `${k}=${body[k]}`)
      .join('&')}`;
    delete newOptions.body;
  }

  if (newOptions.method === 'POST' || newOptions.method === 'PUT' || newOptions.method === 'DELETE') {
    newOptions.body = JSON.stringify(newOptions.body);
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers
      };
    } else {
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers
      };
    }
  }
  return fetch(`${API}${newURL}`, newOptions)
    .then(checkStatus)
    .then(response => response.json())
    .then(checkData)
    .catch(error => {
      if (error.statusCode === 401 && window.location.pathname !== '/login') {
        const fallback = window.location.href;
        window.location.href = `/login?fallback=${fallback}`;
      } else {
        // eslint-disable-next-line no-alert
        window.alert(`API: ${url} ${error.error}(${error.statusCode})\n${JSON.stringify(error.message)}`);
      }
    });
}
