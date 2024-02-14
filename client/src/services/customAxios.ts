import axios from "axios";

const token = localStorage.getItem("TOKEN");

const customAxios = axios.create({
  baseURL: "/api",
});

if (token) {
  customAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

customAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    const responseMessage = error?.response?.data?.message;
    if (Array.isArray(responseMessage)) {
      error.response.data.message = responseMessage.join("\n");
    }
    return Promise.reject(error);
  }
);

export default customAxios;
