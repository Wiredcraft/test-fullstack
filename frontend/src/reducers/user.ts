/* eslint-disable require-jsdoc */

import {IUserAction, IUserState} from '../interfaces/IUser';
import {UserAction, UserReducerParameters} from '../types/User';
import {user} from '../actions';

class User {
  init: UserAction;
  login: UserAction;
  logout: UserAction;
  registered: UserAction;

  initialState: {
    isLoggedIn: boolean;
    token: string | null;
    username: string | null;
    id: string | null;
  };

  constructor([init, login, logout, registered]: UserReducerParameters) {
    this.init = init;
    this.login = login;
    this.logout = logout;
    this.registered = registered;

    this.reducer = this.reducer.bind(this);

    this.initialState = {
      isLoggedIn: false,
      token: null,
      username: null,
      id: null,
    };
  }

  reducer(state = this.initialState, action: IUserAction): IUserState {
    switch (action.type) {
      case this.login:
        return {
          ...action.payload,
          isLoggedIn: true,
        };
      case this.init:
        return {
          ...action.payload,
        };
      case this.logout:
        return {...this.initialState};
      default:
        return state;
    }
  }
}

export const userReducer = (new User([
  user.USER_INIT,
  user.USER_LOGGED_IN,
  user.USER_LOGGED_OUT,
  user.USER_REGISTERED,
])).reducer;

