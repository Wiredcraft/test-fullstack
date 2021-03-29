import axios from 'axios'
import { getToken, removeToken } from '@/utils/auth'
import { get } from 'lodash'
import { history } from '@/router'

// request interceptor
axios.interceptors.request.use(
  (config) => {

    // check token and set authorization
    if (getToken()) {
      config.headers.Authorization = getToken()
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// response interceptor
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {

    // check status code, 401 means unauthorized
    if (error.response.status == 401) {
      alert('Invalid token, please log in again')
      removeToken()

      // navigate to login page
      history.push('/login')
    } else {
      const message = get(error, 'response.data.message')
      message && alert(error.response.data.message)
    }

    return Promise.reject(error)
  }
)

export default axios
