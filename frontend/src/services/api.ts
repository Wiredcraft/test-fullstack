import axios from 'axios'
import { useStore } from '@/store'

const api = axios.create({
  baseURL: '/api',
})

api.interceptors.request.use(
  (config) => {
    const token = useStore.getState().token
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`
      } 
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

api.interceptors.response.use(
  response => {
    return response.data
  },
  err => {
    const response = err.response
    if (response && response.data && response.data.error) {
      return Promise.reject(response.data.error)
    } else {
      return Promise.reject(err)
    }
  }
)

export default api
