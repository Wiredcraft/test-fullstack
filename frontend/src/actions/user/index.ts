import {IUserPayload} from 'src/interfaces/IUser';

export const USER_INIT = 'USER_INIT';
export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';

export const userInitAction = (payload: IUserPayload) => {
  return {
    type: USER_INIT,
    payload,
  };
};

export const userLoggedInAction = (payload: IUserPayload) => {
  return {
    type: USER_LOGGED_IN,
    payload,
  };
};

export const userLoggedOutAction = () => {
  return {
    type: USER_LOGGED_OUT,
  };
};

export const userRegisteredAction = (payload: IUserPayload) => {
  return {
    type: USER_REGISTERED,
    payload,
  };
};
