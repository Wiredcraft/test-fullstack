import {combineReducers} from 'redux';
import * as api from './api';
import * as user from './user';

const rootReducer = combineReducers({
  ...api,
  ...user,
});

export default rootReducer;
