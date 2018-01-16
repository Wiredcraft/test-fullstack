import { createStore, compose, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers/reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = compose(composeEnhancers(applyMiddleware(thunkMiddleware)))

let store = createStore(reducer, enhancer)

export default store
