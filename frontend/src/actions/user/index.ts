import {IUserPayload, IUserRequest} from 'src/interfaces/IUser';
import { UserAction } from 'src/types/User';

export const USER_INIT = 'USER_INIT';
export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';

export const userInitAction = (payload: IUserPayload): IUserRequest => {
  return {
    type: USER_INIT,
    payload,
  };
};

export const userLoggedInAction = (payload: IUserPayload): IUserRequest => {
  return {
    type: USER_LOGGED_IN,
    payload,
  };
};

export const userLoggedOutAction = (): {type: UserAction} => {
  return {
    type: USER_LOGGED_OUT,
  };
};

export const userRegisteredAction = (payload: IUserPayload): IUserRequest => {
  return {
    type: USER_REGISTERED,
    payload,
  };
};
