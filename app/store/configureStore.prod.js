import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/Reducers';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

const reducer = combineReducers({
    root: rootReducer,
    routing: routerReducer
});

const middleware = routerMiddleware(browserHistory);

const enhancer = compose(
    applyMiddleware(thunk, middleware)
);

export default function configureStore(initialState) {
  return createStore(reducer, initialState, enhancer);
}