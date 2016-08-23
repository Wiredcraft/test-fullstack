import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import error from './error';

const rootReducer = combineReducers({
  user,
  error,
  routing: routerReducer,
});

export default rootReducer;
