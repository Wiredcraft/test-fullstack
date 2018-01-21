import axios, { AxiosInstance } from 'axios'
import config from '../configs'

export class HttpStore {
  public httpClient: AxiosInstance

  constructor () {
    this.httpClient = axios.create({ baseURL: config.apiUrl })
  }
}
