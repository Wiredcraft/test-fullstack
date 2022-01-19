"use strict";

require("core-js/modules/es.string.match.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _merge = _interopRequireDefault(require("lodash/merge"));

var _cookie = _interopRequireDefault(require("./cookie"));

var _request = _interopRequireDefault(require("./request"));

var _graphql = _interopRequireDefault(require("./graphql"));

var _socket2 = _interopRequireDefault(require("./socket"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = {
  config(config) {
    (0, _merge.default)(app.config, config);
  },

  get cookie() {
    return (0, _cookie.default)(app.config.cookie);
  },

  get request() {
    return (0, _request.default)(app.config.request);
  },

  get graphql() {
    return (0, _graphql.default)(app.config.graphql);
  },

  get storage() {
    return {
      get: key => {
        return localStorage.getItem(key) === 'undefined' ? undefined : JSON.parse(localStorage.getItem(key));
      },
      set: (key, value) => {
        return localStorage.setItem(key, JSON.stringify(value));
      },
      remove: key => {
        return localStorage.removeItem(key);
      },

      get length() {
        return localStorage.length;
      },

      clear: () => {
        return localStorage.clear();
      }
    };
  },

  get service() {
    const cfg = app.config.service;

    const builder = def => {
      const [all, type, url] = def.replace(/\n/g, '').match(/^(\w+)\s+(.*)$/);
      let service;

      if (/^(query|mutation)$/i.test(type)) {
        service = data => {
          return app.graphql.request(all, data).then(data => data && data.body);
        };

        service.url = all;
      }

      if (/^(GET|POST|PUT|DELETE)$/i.test(type)) {
        service = (data, options) => {
          return app.request[type.toLowerCase()](url, data, options);
        };

        service.url = url;
      }

      return service;
    };

    const results = {};
    Object.keys(cfg.items).map(key => {
      results[key] = typeof cfg.items[key] == 'function' ? cfg.items[key] : builder(cfg.items[key]);
    });
    return results;
  },

  socket: (url, protocols, options) => {
    return (0, _socket2.default)(url, protocols, options || app.config.socket);
  },
  error: handler => {
    window.addEventListener('error', handler);
    window.addEventListener("unhandledrejection", event => handler(event.reason));
  },

  get util() {
    return app.config.util;
  }

};

var _default = config => {
  app.config(require('./config.default').default);
  app.config(config);
  return app;
};

exports.default = _default;