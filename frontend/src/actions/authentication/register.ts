import {IPayload} from '../../interfaces/IRequest';

export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
export const REGISTER_USER_RESET = 'REGISTER_USER_RESET';
export const REGISTER_USER_STARTED = 'REGISTER_USER_STARTED';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';

export const registerUserAction = (payload: IPayload) => {
  return {
    type: REGISTER_USER_STARTED,
    payload,
  };
};

export const registerUserResetAction = () => {
  return {
    type: REGISTER_USER_RESET,
  };
};
