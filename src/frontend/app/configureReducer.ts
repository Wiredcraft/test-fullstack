import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import config from './reducers/configReducer'
import talks from './reducers/talksReducer'
import toast from './reducers/toastReducer'

export default function configureReducer () {
  const reducer = combineReducers({
    config,
    routing,
    talks,
    toast,
  })

  return reducer
}
