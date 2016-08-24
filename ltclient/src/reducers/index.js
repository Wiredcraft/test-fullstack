import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import error from './error';
import talks from './talks';

const rootReducer = combineReducers({
  user,
  error,
  talks,
  routing: routerReducer,
});

export default rootReducer;
