import {authentification as authentificationAction} from '../actions';
import {authentification as authentificationService} from '../services';

import {call, CallEffect, put, SagaReturnType} from 'redux-saga/effects';
import {
  APIFailureAction,
  APISuccessAction,
} from 'src/types/Action';
import {Service} from 'src/types/Service';
import {SagaIterator} from 'redux-saga';

const fetchData = (
    service: Service,
    successType: APISuccessAction,
    failureType: APIFailureAction,
) => {
  return function* (payload: ReturnType<typeof service>): SagaIterator {
    try {
      const response: CallEffect<SagaReturnType<Function>> =
      yield call(service, payload);
      yield put({type: successType, response: response});
    } catch (error) {
      yield put({type: failureType, error: error});
    }
  };
};

export const loginSaga = fetchData(
    authentificationService.loginUserReducer,
    authentificationAction.login.LOGIN_USER_SUCCESS,
    authentificationAction.login.LOGIN_USER_FAILURE,
);

export const registerSaga = fetchData(
    authentificationService.registerUserReducer,
    authentificationAction.register.REGISTER_USER_SUCCESS,
    authentificationAction.register.REGISTER_USER_FAILURE,
);

