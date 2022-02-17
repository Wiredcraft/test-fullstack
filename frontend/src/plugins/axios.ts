import axios from 'axios';

const BASE_URL = process.env.API_HOST || 'http://127.0.0.1:3000';

const $axios = axios.create({
  baseURL: `${BASE_URL}/api/`,
  withCredentials: true,
  xsrfHeaderName: 'X-CSRFToken',
  headers: {
    'Content-type': 'application/json'
  },
  proxy: {
    host: 'localhost',
    port: 3001
  }
});

export { $axios };
