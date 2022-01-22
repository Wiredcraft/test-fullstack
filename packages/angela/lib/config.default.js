"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  key: 'ANGELA',
  cookie: {
    encode: false,
    //是否加密
    exclude: /^TOKEN_/ //排除需要被加密的Cookie项

  },
  request: {},
  graphql: {
    endpoint: '/graphql',
    options: {
      credentials: 'include'
    }
  },
  service: {
    items: {}
  },
  socket: {},
  util: {}
};
exports.default = _default;