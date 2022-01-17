import {combineReducers} from 'redux';
import * as api from './api';

const rootReducer = combineReducers({
  ...api,
});

export default rootReducer;
