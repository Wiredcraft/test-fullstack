import {IPayload} from '../../interfaces/IRequest';

export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGIN_USER_RESET = 'LOGIN_USER_RESET';
export const LOGIN_USER_STARTED = 'LOGIN_USER_STARTED';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

export const loginUserAction = (payload: IPayload) => {
  return {
    type: LOGIN_USER_STARTED,
    payload,
  };
};

export const loginUserResetAction = () => {
  return {
    type: LOGIN_USER_RESET,
  };
};
