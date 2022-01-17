/* eslint-disable require-jsdoc */
import {IUserReducer} from 'src/interfaces/IReducer';
import {
  APIFailureAction,
  APIResetAction,
  APIStartedAction,
  APISuccessAction} from 'src/types/Action';
import {authentification} from '../actions';

class API {
  started: APIStartedAction;
  success: APISuccessAction;
  failure: APIFailureAction;
  reset: APIResetAction;
  initialState: { loading: boolean; response: {}; error: {}; };
  constructor([started, success, failure, reset]: any) {
    this.started = started;
    this.success = success;
    this.failure = failure;
    this.reset = reset;
    this.reducer = this.reducer.bind(this);
    this.initialState = {
      loading: false,
      response: {},
      error: {},
    };
  }

  reducer(state = this.initialState, action: any): IUserReducer {
    switch (action.type) {
      case this.started:
        return {
          ...state,
          loading: true,
        };
      case this.success:
        return {
          ...state,
          loading: false,
          response: action.response,
        };
      case this.failure:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      case this.reset:
        return {
          ...this.initialState,
        };
      default:
        return state;
    }
  }
}

export const loginUserReducer = (new API([
  authentification.login.LOGIN_USER_STARTED,
  authentification.login.LOGIN_USER_SUCCESS,
  authentification.login.LOGIN_USER_FAILURE,
  authentification.login.LOGIN_USER_RESET,
])).reducer;

export const registerUserReducer = (new API([
  authentification.register.REGISTER_USER_STARTED,
  authentification.register.REGISTER_USER_SUCCESS,
  authentification.register.REGISTER_USER_FAILURE,
  authentification.register.REGISTER_USER_RESET,
])).reducer;

