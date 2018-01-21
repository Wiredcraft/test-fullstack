import { action, observable } from 'mobx'
import axios, { AxiosInstance } from 'axios'
import { UserModel } from '../models'
import { HttpStore } from './HttpStore'
import { RouterStore } from './RouterStore'

export class UserStore extends HttpStore {
  @observable
  public accessToken: any

  @observable
  public currentUser: UserModel

  constructor (routerStore: RouterStore) {
    super();
    (async () => {
      await this.loadAccessToken()
      if (!this.currentUser && !['/login', '/register'].includes(routerStore.location.pathname)) {
        routerStore.push('/login')
      }
      setInterval(() => {
        this.refreshAccessToken(this.accessToken).then(() => {
          console.log('access token refresh at ' + new Date())
        })
      }, 3000000) // refresh token every 5 minutes
    })()
  }

  @action
  loadAccessToken = async () => {
    const tokenStr = window.localStorage.getItem('accessToken')
    if (!tokenStr) {
      return
    }
    const tokenObj = JSON.parse(tokenStr)
    if (tokenObj.expires_at < Date.now()) {
      return
    }
    await this.refreshAccessToken(tokenObj)
  }

  refreshAccessToken = async (tokenObj) => {
    this.httpClient.defaults.headers.common['Authorization'] = 'Bearer ' + tokenObj.access_token
    try {
      const refreshResult = await this.httpClient.get('/api/users/refresh-token')
      this.cacheAccessToken(Object.assign(tokenObj, refreshResult.data))
    } catch (error) {
      console.error(error.response.data)
      this.currentUser = null
      this.accessToken = null
    }
  }
  @action
  cacheAccessToken = async (loginResultData) => {
    console.log('cache access token')
    this.currentUser = new UserModel(loginResultData.username, loginResultData.email)
    this.httpClient.defaults.headers.common['Authorization'] = 'Bearer ' + loginResultData.access_token
    loginResultData.expires_at = loginResultData.expires_in * 1000 + Date.now()
    this.accessToken = Object.assign({}, loginResultData)
    window.localStorage.setItem('accessToken', JSON.stringify(loginResultData))
  }

  @action
  login = async (loginInfo: Partial<UserModel>) => {
    const loginResult = await this.httpClient.post('/login', loginInfo)
    if (loginResult && loginResult.data) {
      this.cacheAccessToken(loginResult.data)
    }
  }

  @action
  register = async (registerInfo: Partial<UserModel>) => {
    const registerResult = await this.httpClient.post('/register', registerInfo)
    return
  }
}
