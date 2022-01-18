import {IAPIPayload, IAPIRequest} from '../../../interfaces/IAPI';

export const API_REGISTER_USER_FAILURE = 'API_REGISTER_USER_FAILURE';
export const API_REGISTER_USER_RESET = 'API_REGISTER_USER_RESET';
export const API_REGISTER_USER_STARTED = 'API_REGISTER_USER_STARTED';
export const API_REGISTER_USER_SUCCESS = 'API_REGISTER_USER_SUCCESS';

export const apiRegisterUserAction = (payload: IAPIPayload): IAPIRequest => {
  return {
    type: API_REGISTER_USER_STARTED,
    payload,
  };
};

export const apiRegisterUserResetAction = (): IAPIRequest => {
  return {
    type: API_REGISTER_USER_RESET,
  };
};
