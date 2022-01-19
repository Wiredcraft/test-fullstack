"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlRequest = require("graphql-request");

const graphql = function graphql() {
  let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    endpoint = '/graphql',
    options = {
      credentials: 'include'
    }
  } = config;
  return new _graphqlRequest.GraphQLClient(endpoint, options);
};

var _default = graphql;
exports.default = _default;