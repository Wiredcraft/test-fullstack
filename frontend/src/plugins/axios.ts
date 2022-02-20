import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production'? 'https://stefan-wc-test.herokuapp.com' : 'http://127.0.0.1:3001';

const $axios = axios.create({
  baseURL: `${BASE_URL}/api/`,
  withCredentials: true,
  xsrfHeaderName: 'X-CSRFToken',
  headers: {
    'Content-type': 'application/json'
  }
});

export { $axios };
