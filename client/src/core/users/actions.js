import * as TYPES from '../constants';


export const userActions = {

  authUser: ({ authType, name, password }, { resolve, reject }) => ({
    type: TYPES.AUTH_USER,
    payload: {
      authType,
      name,
      password,
      resolve,
      reject
    }
  }),

  authUserSuccess: ({ user, message }) => ({
    type: TYPES.AUTH_USER_SUCCESS,
    payload: {
      user,
      message
    }
  }),

  authUserFailure: error => ({
    type: TYPES.AUTH_USER_FAILURE,
    payload: {
      error
    }
  }),

  logoutUser: () => ({
    type: TYPES.RESET_AUTHED_USER
  }),

};


export const userRequestActions = {
  authPending: userActions.authUser,
  authFulfilled: userActions.authUserSuccess,
  authFailed: userActions.authUserFailure
};
