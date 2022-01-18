import {IAPIActions, IAPIAuthPayload} from '../../../interfaces/IAPI';

export const API_LOGIN_USER_FAILURE = 'API_LOGIN_USER_FAILURE';
export const API_LOGIN_USER_RESET = 'API_LOGIN_USER_RESET';
export const API_LOGIN_USER_STARTED = 'API_LOGIN_USER_STARTED';
export const API_LOGIN_USER_SUCCESS = 'API_LOGIN_USER_SUCCESS';

export const apiLoginUserAction = (payload: IAPIAuthPayload): IAPIActions => {
  return {
    type: API_LOGIN_USER_STARTED,
    payload,
  };
};

export const apiLoginUserResetAction = (): IAPIActions => {
  return {
    type: API_LOGIN_USER_RESET,
  };
};
