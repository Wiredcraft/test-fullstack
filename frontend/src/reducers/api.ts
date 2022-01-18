/* eslint-disable require-jsdoc */
import {
  APIFailureAction,
  APIResetAction,
  APIStartedAction,
  APISuccessAction,
  APIReducerParameters,
} from '../types/API';

import actions from '../actions/api';
import {IAPIAction, IAPIState} from '../interfaces/IAPI';

class API {
  started: APIStartedAction;
  success: APISuccessAction;
  failure: APIFailureAction;
  reset: APIResetAction;

  initialState: IAPIState;

  constructor([started, success, failure, reset]: APIReducerParameters) {
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

  reducer(
      state = this.initialState,
      action: IAPIAction,
  ): IAPIState {
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

export const apiLoginUserReducer = (new API([
  actions.authentication.login.API_LOGIN_USER_STARTED,
  actions.authentication.login.API_LOGIN_USER_SUCCESS,
  actions.authentication.login.API_LOGIN_USER_FAILURE,
  actions.authentication.login.API_LOGIN_USER_RESET,
])).reducer;

export const apiRegisterUserReducer = (new API([
  actions.authentication.register.API_REGISTER_USER_STARTED,
  actions.authentication.register.API_REGISTER_USER_SUCCESS,
  actions.authentication.register.API_REGISTER_USER_FAILURE,
  actions.authentication.register.API_REGISTER_USER_RESET,
])).reducer;

