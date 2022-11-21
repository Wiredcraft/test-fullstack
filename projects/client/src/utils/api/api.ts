import {AxiosResponse, AxiosError} from "axios"

const axios = require('axios');


const api = axios.create({
  baseURL:   `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/api`,
  withCredentials: true,
})


api.interceptors.response.use((response: AxiosResponse) => {
  if (response.data.retcode !== 0) {
    alert(response.data.message);
  }
  return response.data;
}, (error: AxiosError) => {
  console.error(error)
  return Promise.reject(error);
});

export default api;
