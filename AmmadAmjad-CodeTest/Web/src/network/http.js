import axios from 'axios';
const baseURL = 'http://localhost:3001/';

export const HTTP = axios.create({
  baseURL: baseURL,
  responseType: 'json'
});

export const URLS = {
  baseURL: baseURL,
  REGISTER: '/user/register',
  LOGIN: '/user/login',
  COMMENTS : '/comment/list/all?sortBy=:sortBy&page=1&limit=1000',
  VOTE : 'comment/:commentId/vote',
  CREATE_COMMENT : 'comment/create'
}
