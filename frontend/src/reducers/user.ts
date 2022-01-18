

import {IUserAction, IUserState} from '../interfaces/IUser';
import {UserAction, UserReducerParameters} from '../types/User';
import {user} from '../actions';

/**
 * Class which handles the state of the User and
 * return a reducer according to an action type.
 * @param {UserReducerParameters} - The actions to triggers.
 * @return {ReactElement}
 */
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

  /**
  * Initialize the actions and initial reducer state
  * @constructor
  * @param {UserReducerParameters} - The actions of the reducers
  */
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

  /**
  * Create and return a reducer according to an action type.
  * @param {IUserState} state - Initial reducer state
  * @param {IUserAction} action - The action of the reducers
  * @return {IUserState}
 */
  reducer(
      state: IUserState = this.initialState, action: IUserAction,
  ): IUserState {
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

