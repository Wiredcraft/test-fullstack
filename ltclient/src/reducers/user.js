function user(state = {
  isFetching: false,
}, action) {
  switch (action.type) {
    case 'START_LOGIN':
    case 'START_SIGNUP':
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'DONE_LOGIN':
      return Object.assign({}, state, {
        isFetching: false,
        token: action.token,
        username: action.username,
        userId: action.userId,
      });
    case 'DONE_SIGNUP':
    case 'FAIL_SIGNUP':
      return Object.assign({}, state, {
        isFetching: false,
      });
    case 'FAIL_LOGIN':
    case 'START_LOGOUT':
      return Object.assign({}, state, {
        isFetching: false,
        username: undefined,
      });
    default:
      return state;
  }
}

export default user;
