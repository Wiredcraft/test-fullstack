import {
  APIFailureAction,
  APIReducerParameters,
  APIResetAction,
  APIStartedAction,
  APISuccessAction,
} from '../types/API';

import {IAPIAction, IAPIState} from '../interfaces/IAPI';
import actions from '../actions/api';

/**
 * Class which handles the state of the API and
 * return a reducer according to an action type.
 * @param {APIReducerParameters} - The actions to triggers.
 * @return {ReactElement}
 */
class API {
  started: APIStartedAction;
  success: APISuccessAction;
  failure: APIFailureAction;
  reset: APIResetAction;

  initialState: IAPIState;

  /**
  * Initialize the actions and initial reducer state
  * @constructor
  * @param {APIReducerParameters} - The actions of the reducers
  */
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

  /**
  * Create and return a reducer according to an action type.
  * @param {IAPIState} state - Initial reducer state
  * @param {IAPIAction} action - The action of the reducers
  * @return {IAPIState}
 */
  reducer(
      state: IAPIState = this.initialState,
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

