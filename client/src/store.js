import { createStore, compose, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { combineReducers } from 'redux'
import persistState from 'redux-localstorage'
import talksReducer from './reducers/talks'
import likesReducer from './reducers/likes'

let reducer = combineReducers({
    talks: talksReducer,
    likes: likesReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = compose(
  composeEnhancers(applyMiddleware(thunkMiddleware),
    persistState('likes')
  )
)

let store = createStore(reducer, enhancer)

export default store
