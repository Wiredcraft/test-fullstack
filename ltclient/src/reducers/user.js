function user(state = {
  isFetching: false,
}, action) {
  switch (action.type) {
    case 'REQUEST_TOKEN':
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'RECEIVE_TOKEN':
      return Object.assign({}, state, {
        isFetching: false,
        token: action.token,
        username: action.username,
        userId: action.userId,
      });
    case 'FAIL_TOKEN':
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
