import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import persistState from 'redux-localstorage';
import * as Reducer from './reducer.jsx';

let logger = createLogger();

const reducer = combineReducers({
  topics: Reducer.Topics.Reducer,
  auth: Reducer.Auth.Reducer
});

export default compose(
  persistState('auth'),
  applyMiddleware(promiseMiddleware, logger),
)(createStore)(reducer);
