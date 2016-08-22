import { combineReducers } from 'redux';
import user from './user';
import error from './error';

const rootReducer = combineReducers({
  user,
  error,
});

export default rootReducer;
