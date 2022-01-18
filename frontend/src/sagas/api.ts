import {api as apiActions} from '../actions';
import {authentication as apiAuthenticationService} from '../services';

import {call, CallEffect, put, SagaReturnType} from 'redux-saga/effects';
import {
  APIFailureAction,
  APISuccessAction,
} from '../types/API';
import {Service} from '../types/Service';
import {SagaIterator} from 'redux-saga';
import {user} from '../actions';
import {UserAction} from 'src/types/User';

const fetchData = (
    service: Service,
    successType: APISuccessAction,
    failureType: APIFailureAction,
    callbackAction: UserAction,
) => {
  return function* (payload: ReturnType<typeof service>): SagaIterator {
    try {
      const response: CallEffect<SagaReturnType<Function>> =
      yield call(service, payload);
      yield put({type: successType, response: response});
      yield put({type: callbackAction, payload: response});
    } catch (error) {
      yield put({type: failureType, error: error});
    }
  };
};

export const loginSaga = fetchData(
    apiAuthenticationService.apiLoginUserReducer,
    apiActions.authentication.login.API_LOGIN_USER_SUCCESS,
    apiActions.authentication.login.API_LOGIN_USER_FAILURE,
    user.USER_LOGGED_IN,
);

export const registerSaga = fetchData(
    apiAuthenticationService.apiRegisterUserReducer,
    apiActions.authentication.register.API_REGISTER_USER_SUCCESS,
    apiActions.authentication.register.API_REGISTER_USER_FAILURE,
    user.USER_REGISTERED,
);
