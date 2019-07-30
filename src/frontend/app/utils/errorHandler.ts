import { validJson } from './utils'
import { executeActions } from './executeActions'

const _ = require('./underscore')

export const ERR_MSGS: any = {
  UNKNOWN: 'Network error',
  UNAUTHORIZED: 'Forbidden, authorization is required'
}

interface Result {
  [key: string]: any,
}

export const resultHandler = (result: Result) => {
  let toReturn: any = {
    hasErr: false,
    errMsg: null
  }
  const { statusCode, statusText, error, errmsg, doToast } = result
  const correctStatus = (statusCode === 200)
  const defaultErrMsg = ERR_MSGS.UNKONWN

  if (!correctStatus) {

    toReturn.hasErr = true

    if (error) {
      toReturn.errMsg = error
    }

    if (validJson(errmsg)) {
      const errObj = JSON.parse(errmsg)
      const { errors } = errObj

      if (errors && !_.isEmpty(errors)) {
        toReturn.errMsg = JSON.stringify(errors)
      }
    }

    if (!toReturn.errMsg) {
      toReturn.errMsg = ERR_MSGS[statusText.toUpperCase()] || defaultErrMsg
    }
  }

  if (toReturn.hasErr && toReturn.errMsg) {
    doToast && executeActions({
      type: 'toast',
      payload: {
        showToast: true,
        message: toReturn.errMsg
      }
    })
  }

  toReturn = Object.assign(toReturn, result)
  return toReturn
}
