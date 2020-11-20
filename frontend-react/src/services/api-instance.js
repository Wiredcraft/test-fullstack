import axios from 'axios';
import history from './history';

const instance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// Set JWT access token for each request if the user was logged in
instance.interceptors.request.use(
  config => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('user'));;
      if (currentUser) {
        config.headers['Authorization'] = `Bearer ${currentUser.jwt.accessToken}`;
      }
    } catch (e) {}

    return config;
  },
  error => Promise.reject(error)
);

// Redirect user to the login page if the server responses unauthorized
instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (401 === error.response?.status) {
    history.push(`/login?returnUrl=${encodeURIComponent(window.location.pathname + window.location.search)}`);
  }
  return Promise.reject(error);
});

export default instance;
