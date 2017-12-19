import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

const myReducer = (state = {}, action) => {
  switch (action.type) {
    case '':
      return Object.assign({}, state, {features: action.test})
    default:
      return state
  }
}

const reducers = combineReducers({
  routerReducer,
  myReducer
})

export default reducers
