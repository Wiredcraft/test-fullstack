import axios from "axios";
import { STORE_USER_INFO } from "../constants/auth";

const BASE_URL = "http://localhost:8383";
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000
});

instance.interceptors.request.use(config => {
  const { headers = {} } = config;
  const userString = localStorage.getItem(STORE_USER_INFO);
  if (userString) {
    try {
      const { token } = JSON.parse(userString);
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
  return config;
});

instance.interceptors.response.use(
  response => {
    if (response.data.success) {
      return response.data.result;
    }
    throw response.data.reason;
  },
  error => Promise.reject(error)
);

export default instance;
