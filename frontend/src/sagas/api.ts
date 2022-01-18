import {
  APIFailureAction,
  APISuccessAction,
} from '../types/API';
import {CallEffect, SagaReturnType, call, put} from 'redux-saga/effects';
import {SagaIterator} from 'redux-saga';
import {Service} from '../types/Service';
import {UserAction} from 'src/types/User';
import {api as apiActions} from '../actions';
import services from '../services';
import {user} from '../actions';


const fetchData = (
    service: Service,
    successType: APISuccessAction,
    failureType: APIFailureAction,
    callbackAction?: UserAction,
) => {
  return function* (payload: ReturnType<typeof service>): SagaIterator {
    try {
      const response: CallEffect<SagaReturnType<Function>> =
      yield call(service, payload);
      yield put({type: successType, response: response});

      if (callbackAction) {
        yield put({type: callbackAction, payload: response});
      }
    } catch (error) {
      yield put({type: failureType, error: error});
    }
  };
};

export const loginSaga = fetchData(
    services.apiLoginUserService,
    apiActions.authentication.login.API_LOGIN_USER_SUCCESS,
    apiActions.authentication.login.API_LOGIN_USER_FAILURE,
    user.USER_LOGGED_IN,
);

export const registerSaga = fetchData(
    services.apiRegisterUserService,
    apiActions.authentication.register.API_REGISTER_USER_SUCCESS,
    apiActions.authentication.register.API_REGISTER_USER_FAILURE,
    user.USER_REGISTERED,
);

export const deleteTalksSaga = fetchData(
    services.apiDeleteTalksService,
    apiActions.talks.API_TALKS_DELETE_SUCCESS,
    apiActions.talks.API_TALKS_DELETE_FAILURE,
);

export const getTalksSaga = fetchData(
    services.apiGetTalksService,
    apiActions.talks.API_TALKS_GET_SUCCESS,
    apiActions.talks.API_TALKS_GET_FAILURE,
);

export const listTalksSaga = fetchData(
    services.apiListTalksService,
    apiActions.talks.API_TALKS_LIST_SUCCESS,
    apiActions.talks.API_TALKS_LIST_FAILURE,
);


export const patchTalksSaga = fetchData(
    services.apiPatchTalksService,
    apiActions.talks.API_TALKS_PATCH_SUCCESS,
    apiActions.talks.API_TALKS_PATCH_FAILURE,
);

export const postTalksSaga = fetchData(
    services.apiPostTalksService,
    apiActions.talks.API_TALKS_POST_SUCCESS,
    apiActions.talks.API_TALKS_POST_FAILURE,
);

export const postVoteSaga = fetchData(
    services.apiPostVoteService,
    apiActions.vote.API_VOTE_POST_SUCCESS,
    apiActions.vote.API_VOTE_POST_FAILURE,
);

const sagas = {
  deleteTalksSaga,
  getTalksSaga,
  listTalksSaga,
  loginSaga,
  patchTalksSaga,
  postVoteSaga,
  postTalksSaga,
  registerSaga,
};

export default sagas;
