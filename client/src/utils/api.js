import axios from 'axios';

import API from '../libs/api';

const config = {
  env: process.env.NODE_ENV,
  development: {
    host: 'http://127.0.0.1:3000'
  },
  production: {
    host: 'http://127.0.0.1:3000'
  },
  route: {
    prefix: 'api/v1',
    user: [
      { name: 'login', path: 'Users/login', method: 'post' },
      { name: 'signup', path: 'Users', method: 'post' },
      { name: 'logout', path: 'Users/logout', method: 'post' }
    ],
    lightningTalk: [
      { name: 'create', path: 'LightningTalks', method: 'post' },
      { name: 'list', path: 'LightningTalks', method: 'get' },
      { name: 'detail', path: 'LightningTalks/:id', method: 'get' },
      { name: 'up', path: 'LightningTalks/:id/up', method: 'post' },
      { name: 'down', path: 'LightningTalks/:id/up', method: 'delete' }
    ]
  },
  options: {
    header: {
      // 'Content-Type': 'application/x-www-form-urlencoded'
      'Content-Type': 'application/json'
    },
    dataType: 'json',
    responseType: 'text'
  },
  // axios request handler
  request: (url, options) => {
    const config = {
      method: options.method,
      url: url,
      headers: options.header,
      responseType: options.responseType
    };

    if (options.method.toUpperCase() === 'GET') {
      config.params = options.data;
    } else {
      config.data = options.data;
    }
    return axios(config);
  }
};

export const api = new API(config);

export default {
  install(Vue, options) {
    // Inject api
    Vue.mixin({
      created: function() {
        this.$api = api;
      }
    });
  }
};
