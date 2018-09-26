/*
 * The wrapper for wx.request method
 *
 * @param {api} api - a instance of api
 *
 */
class Req {
  constructor(api) {
    this.api = api;
  }

  /*
   * Get method
   *
   * @param {Object|String} options
   * @param {Object} [query] query params object
   *
   * @return {Function} _sendRequest call
   *
   */
  get(url, options) {
    this.api.method = 'get';

    return _sendRequest(this.api, url, options);
  }

  /*
   * Post method
   *
   * @param {Object|String} options
   * @param {Object} [body] body data object
   *
   * @return {Function} _sendRequest call
   *
   */
  post(url, options) {
    this.api.method = 'post';

    return _sendRequest(this.api, url, options);
  }

  /*
   * Put method
   *
   * @param {Object|String} options
   * @param {Object} [body] body data object
   *
   * @return {Function} _sendRequest call
   *
   */
  put(url, options) {
    this.api.method = 'put';

    return _sendRequest(this.api, url, options);
  }

  /*
   * Delete method
   *
   * @param {Object|String} options
   * @param {Object} [body] body data object
   *
   * @return {Function} _sendRequest call
   *
   */
  delete(url, options) {
    this.api.method = 'delete';

    return _sendRequest(this.api, url, options);
  }
}

const isEmpty = (value) => {
  switch (typeof value) {
    case 'number':
      return typeof value === 'number' && isNaN(value);
    case 'object':
      if (value === null) return true;
      if (Array.isArray(value) && value.length === 0) return true;
      if (Object.getOwnPropertyNames(value).length === 0) return true;
      return false;
    case 'string':
      return value.replace(/\s/g, '').length === 0;
    case 'boolean':
      return false;
    default:
      return true;
  }
};

const replaceUrlPath = (urlPath, data) => {
  data = data || {};
  const regex = /:(\w+)/g;
  let m;
  while ((m = regex.exec(urlPath)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    if (data[m[1]]) {
      urlPath = urlPath.replace(m[0], data[m[1]]);
    }

    delete data[m[1]];
  }

  return urlPath;
};

function _sendRequest(api, url, options) {
  options = options || {};

  const isOption = Object.getOwnPropertyNames(options).some((key) => [
    'data',
    ...Object.keys(api.config.options || {}),
    'success',
    'fail',
    'complete'
  ].indexOf(key) > -1);

  // NOTE: remove empty value
  Object.getOwnPropertyNames(options).forEach((key) => {
    if (isEmpty(options[key])) delete options[key];
  });

  if (!isOption) {
    options = {
      data: options
    };
  }

  options.method = api.method.toUpperCase();

  options = Object.assign({}, api.config.options, options);

  if (Object.keys(options.data).length !== 0) {
    url = replaceUrlPath(url, options.data);
  }

  options.header = options.header || {};
  options.header.Authorization = api.access_token || '';

  // Referer not allowed in header
  if (options.header && options.header.hasOwnProperty('Referer')) {
    delete options.header.Referer;
  }

  if (
    options.hasOwnProperty('responseType') &&
    ['text', 'arraybuffer'].indexOf(options.responseType) < 0
  ) {
    options.responseType = 'text';
  }

  return api.requestHandler(url, options);
}

export default Req;
