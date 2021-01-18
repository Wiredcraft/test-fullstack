import * as TYPES from '../constants';


export const initialState = {
  authedUser: {
    loading: false,
    error: null,
    message: null,
    token: null,
    user: null
  }
};

export function userReducer(state = initialState, action = {}) {
  let payload, user;

  if (!action.type) action.type = '';
  if (!action.payload) action.payload = {};
  payload = action.payload;
  switch (action.type) {

    case TYPES.AUTH_USER:
      return {
        authedUser: {
          ...state.authedUser,
          loading: true, error: null, message: null
        }
      };

    case TYPES.AUTH_USER_FAILURE:
      return {
        authedUser: {
          loading: false,
          error: payload.error,
          ...state.authedUser
        }
      };

    case TYPES.AUTH_USER_SUCCESS:
      user = payload.user || {};
      return {
        authedUser: {
          error: null,
          loading: false,
          message: payload.message,
          token: user.token,
          user: user
        }
      };

    case TYPES.RESET_AUTHED_USER:
      return {
        authedUser: {
          loading: false, error: null, message: null, token: null, user: null
        }
      };

    default:
      return state;
  }
};
