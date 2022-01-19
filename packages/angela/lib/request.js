"use strict";

require("core-js/modules/es.promise.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _formUrlencoded = _interopRequireDefault(require("form-urlencoded"));

var _flip = _interopRequireDefault(require("lodash/flip"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _merge = _interopRequireDefault(require("lodash/merge"));

var _template = _interopRequireDefault(require("lodash/template"));

var _wrap = _interopRequireDefault(require("lodash/wrap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 返回请求对象
 * 
 * @param {any} [settings={}]
 * @returns 
 */
const request = function request() {
  let settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  settings = (0, _merge.default)({
    options: {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': "XMLHttpRequest"
      }
    }
  }, settings);
  /** default request handler */

  function onRequest(req) {
    const urlencoded = data => {
      return (0, _formUrlencoded.default)(data, {
        ignorenull: true
      });
    };

    req.url = (0, _template.default)(req.url)(req.body);

    if (req.method == 'GET') {
      req.body = urlencoded(req.body);
      return req;
    }

    let encodeFunc;

    if (req.headers['Content-Type'] == 'application/json') {
      encodeFunc = JSON.stringify;
    }

    if (req.headers['Content-Type'] == 'application/x-www-form-urlencoded') {
      encodeFunc = urlencoded;
    }

    req.body = encodeFunc(req.body);
    return req;
  }
  /** default response handler */


  function onResponse(res) {
    if (res.status != 200) {
      return Promise.reject({
        code: res.status,
        message: res.statusText
      });
    }

    return res.json().then(result => {
      const {
        code,
        body,
        message
      } = result;

      if (code === '000000') {
        return body;
      }

      return Promise.reject({
        code,
        body,
        message
      });
    });
  }
  /** default error handler */


  function onError(error) {
    return Promise.reject(error);
  }

  function doFetch(url, options) {
    return fetch(url, options).then(settings.onResponse ? (0, _wrap.default)(onResponse, (0, _flip.default)(settings.onResponse)) : onResponse).catch(settings.onError ? (0, _wrap.default)(onError, (0, _flip.default)(settings.onError)) : onError);
  }

  return {
    get(url) {
      let data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      let options = arguments.length > 2 ? arguments[2] : undefined;
      options = (0, _merge.default)({
        url: url,
        method: 'GET',
        body: data
      }, settings.options, options);
      return Promise.resolve(options).then(settings.onRequest ? (0, _wrap.default)(onRequest, (0, _flip.default)(settings.onRequest)) : onRequest).then(req => {
        return doFetch([req.url, req.body].join('?'), (0, _omit.default)(req, 'body'));
      });
    },

    post(url) {
      let data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      let options = arguments.length > 2 ? arguments[2] : undefined;
      options = (0, _merge.default)({
        url: url,
        method: 'POST',
        body: data
      }, settings.options, options);
      return Promise.resolve(options).then(settings.onRequest ? (0, _wrap.default)(onRequest, (0, _flip.default)(settings.onRequest)) : onRequest).then(req => {
        return doFetch(req.url, req);
      });
    },

    fetch: fetch
  };
};

var _default = request;
exports.default = _default;