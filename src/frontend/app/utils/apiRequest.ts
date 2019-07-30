import superagent from 'superagent'
// import { appInfo, versionNumber } from '../config'
import { validJson, wordsEqual, regHttp, handleUserCookies } from './utils'
// import { resultHandler } from './resultHandler'
import { resultHandler } from './errorHandler'
import { handleLogout } from './executeActions'

const _ = require('./underscore')
const methods = ['get', 'post', 'put', 'patch', 'del']

function formatUrl (path: string) {
  const isHttpPath = regHttp.test
  const hasSlash = (path[0] === '/')
  const adjustedPath = (isHttpPath || hasSlash) ? path : '/' + path
  const apiPrefix = '' // api
  return apiPrefix + adjustedPath;
}

function jsonToUrlParams (data: any) {
  if (typeof data !== 'object') return ''
  return Object.keys(data).map(k => {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&');
}

export default class ApiRequest {
  constructor() {

    let ths: Record<string, any> = {}
    ths = this

    methods.forEach(method =>

      ths[method] = (
        path: any,
        {
          params,
          data,
          requestAction
        }: {
          params: any,
          data: any,
          requestAction: any
        }
      ) => new Promise((resolve, reject) => {

        const isGet = wordsEqual('get', method)
        let url = formatUrl(path)

        params = (typeof params === 'object') ? params : {}
        data = (typeof data === 'object') ? data : {}

        let finalParams: Record<string, any> = {}

        if (_.isObject(params)) {
          finalParams = _.extend(finalParams, params)
        }

        if (_.isObject(data)) {
          finalParams = _.extend(finalParams, data)
        }

        if (isGet) {
          url = `${url}?${jsonToUrlParams(finalParams)}`
        }

        // console.log('ApiRequest====================', params, data, finalParams)
        const responseWait = finalParams.responseWait || 10000
        const deadline = finalParams.deadline || 10000
        const request = superagent[method](url).timeout({
          response: responseWait,
          deadline,
        })
        const contentType = 'application/json'
        const userCookieData = handleUserCookies('get')

        request.set('Content-Type', finalParams.contentType || contentType)

        if (_.isObject(userCookieData) && userCookieData.token) {
          request.set('Authorization', userCookieData.token)
        }

        if (!isGet) {
          const sendData = finalParams.sendBodyOnly ? finalParams.sendBodyOnly : finalParams
          request.send(sendData)
        }

        request.end((err: any, resObj: any = {}) => {
          let { body, text } = resObj
          const { statusCode, statusText, text: responseMsg } = resObj
          const incorrectStatus = (statusCode !== 200)
          const unauthorized = (statusCode === 401)

          // console.log(`Full Request ↓↓↓↓↓`, request)
          // console.log(`Full response ↓↓↓↓↓`, resObj)

          if (!body && text) {
            text = validJson(text) ? JSON.parse(text) : text
            body = text
          }

          if (!_.isObject(body)) {
            body = {
              other: body || '',
            }
          }

          body.statusCode = statusCode
          body.statusText = statusText
          body.errmsg = incorrectStatus ? responseMsg : null

          if (incorrectStatus) {

            unauthorized && handleLogout()

            body.doToast = true
            resultHandler(body)
            // store.dispatch(onToast({ showToast: true, message: 'some message'}))
          }

          resolve(body)
        })
      }))
  }
  empty() {}
}
