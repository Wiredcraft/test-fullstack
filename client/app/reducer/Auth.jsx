import mirror from '../util/mirror';

const initialState = {
  id: 'userid',
  authkey: '2323232322232232323'
}

export const AuthConst = mirror([
  'LOGIN',
  'LOGOUT'
])

export function Reducer(state = initialState, action) {
  switch (action.type) {
    case AuthConst.LOGIN:
      return {
        haha : 'test'
      };
    case AuthConst.LOGOUT:
      return {
        id: null,
        authkey: null
      };
    default:
      return state;
  }
};
