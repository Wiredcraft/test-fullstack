"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsCookie = _interopRequireDefault(require("js-cookie"));

var _jsBase = require("js-base64");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 返回Cookie对象
 * 
 * @param {any} [options={encode, exclude}] 
 * @returns 
 */
const cookie = function cookie() {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    encode = true,
    exclude = /^TOKEN_/
  } = options;

  if (encode) {
    return _jsCookie.default.withConverter({
      read: (value, name) => {
        if (!exclude.test(name)) {
          return _jsBase.Base64.decode(decodeURIComponent(value));
        }

        return value;
      },
      write: (value, name) => {
        if (!exclude.test(name)) {
          return encodeURIComponent(_jsBase.Base64.encode(value));
        }

        return value;
      }
    });
  }

  return _jsCookie.default;
};

var _default = cookie;
exports.default = _default;