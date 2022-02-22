import api from './api'
import queryString from 'query-string'

export const AUTH_TOKEN_KEY = 'AUTH_TOKEN'

type LoginParams = {
  username: string
  password: string
}

type LoginResponse = {
  token: string
  user: {
    username: string
  }
}


export const fetchUser = (): Promise<{ username: string }> => api.get('/users/me')
export const login = (params: LoginParams): Promise<LoginResponse> => api.post('/users/login', params)
export const register = (params: LoginParams): Promise<LoginResponse> => api.post('/users', params)

export const saveToken = (token: string) => {
  window.localStorage.setItem(AUTH_TOKEN_KEY, token) 
}

export const loadToken = () => {
  return window.localStorage.getItem(AUTH_TOKEN_KEY)
}

export const clearToken = () => {
  window.localStorage.clear()
}

export const redirectWithToken = (token: string, params: any) => {
  if (params.redirect) {
    window.location.href = queryString.stringifyUrl({
      url: params.redirect,
      query: {
        token
      }
    })
  }
  window.location.href = '/'
}
