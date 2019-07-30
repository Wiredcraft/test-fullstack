import { store } from '../createStore'
import { onToast } from '../actions/toastActions'
import { updateUserInfo } from '../actions/talksActions'
import { handleUserCookies } from './utils'

const _ = require('./underscore')

export const executeActions = (params: any) => {
  const { type, payload } = params

  if (typeof store.dispatch !== 'function') return false

  const actions: any = {
    toast: () => {
      if (!_.isObject(payload)) return false
      return store.dispatch(onToast({
        showToast: true,
        message: payload.message,
      }))
    }
  }
  const aKeys = Object.keys(actions)

  if (!aKeys.includes(type)) return false

  return actions[type]()
}

export const handleLogout = () => {
  handleUserCookies('remove')
  store.dispatch(updateUserInfo({ reset: true }))
  return true
}
