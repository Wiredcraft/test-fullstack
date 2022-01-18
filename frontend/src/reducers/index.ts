import * as api from './api';
import * as user from './user';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  ...api,
  ...user,
});

export default rootReducer;
