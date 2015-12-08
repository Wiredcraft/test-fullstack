import { AuthConst } from '../reducer/Auth';
import * as utils from '../util/api';
import * as RouteActions from './RouteActions';

export function logout() {
  return {
    type: AuthConst.LOGOUT
  }
}

export function login(auth) {
  return (dispatch, getState) => {
    dispatch({
      type: AuthConst.LOGIN_LOADING
    });
    utils.login(auth).then((data) => {
      RouteActions.go('/submit');
      
      dispatch({
        type: AuthConst.LOGIN_SUCCESS,
        payload: {
          id: 'ds',
          authkey: 'dffd'
        }
      });
    }).catch(() => {
      dispatch({
        type: AuthConst.LOGIN_ERROR
      });
    })
  };
}

export function signup(auth) {
  return (dispatch, getState) => {
    dispatch({
      type: AuthConst.SIGNUP_LOADING
    });
    utils.signup(auth).then((signupData) => new Promise((resolve, reject) => {
      utils.login(auth).then((loginData) => resolve([loginData, signupData])).catch(reject)
    })).then((data) => {
      RouteActions.go('/submit');

      let [loginData, signupData] = data;
      dispatch({
        type: AuthConst.SIGNUP_SUCCESS,
        payload: {
          id: signupData.id,
          authkey: loginData.id,
          username: signupData.username
        }
      });
    }).catch(() => {
      dispatch({
        type: AuthConst.SIGNUP_ERROR
      });
    })
  };
}
