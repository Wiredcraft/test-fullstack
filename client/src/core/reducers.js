import { combineReducers } from 'redux';
import { userReducer } from './users';
import { pollReducer } from './polls';
import { reducer as form } from 'redux-form';
import { routerReducer } from 'react-router-redux';


export default combineReducers({
  users: userReducer,
  polls: pollReducer,
  form,
  router: routerReducer
});
