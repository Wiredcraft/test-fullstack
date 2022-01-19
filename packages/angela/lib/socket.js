"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reconnectingWebsocket = _interopRequireDefault(require("reconnecting-websocket"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * WebSocket 构造函数
 * 
 * @param {any} url 
 * @param {any} protocols 
 * @param {any} options 
 * @returns 
 */
const Socket = (url, protocols, options) => {
  return new _reconnectingWebsocket.default(url, protocols, options);
};

var _default = Socket;
exports.default = _default;