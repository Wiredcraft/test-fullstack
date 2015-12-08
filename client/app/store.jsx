import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import persistState from 'redux-localstorage';
import * as Auth from './reducer/Auth';
import * as Submit from './reducer/Submit';
import * as Topics from './reducer/Topics';

let logger = createLogger();

const reducer = combineReducers({
  topics: Topics.Reducer,
  auth: Auth.Reducer,
  submit: Submit.Reducer
});

export default compose(
  persistState('auth'),
  applyMiddleware(thunkMiddleware, logger),
)(createStore)(reducer);
