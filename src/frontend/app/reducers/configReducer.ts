import { combineReducers } from 'redux'

import talks from './talksReducer'
import toast from './toastReducer'

export default function configureReducer (initialState: any, platformReducers: any) {
  const reducer = combineReducers({
    ...platformReducers,
    talks,
    toast,
  })

  const rootReducer = (state: any, action: any) => {
    // if (action.type === 'RESET_ALL_STATE') {
    //   state = undefined
    // }

    return reducer(state, action)
  }

  return rootReducer
}
