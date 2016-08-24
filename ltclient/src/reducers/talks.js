function talks(state = {
  isFetching: false,
  list: [],
}, action) {
  switch (action.type) {
    case 'REQUEST_TALKLIST':
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'RECEIVE_TALKLIST':
      // TODO to add `isValid` prop if necessary
      return Object.assign({}, state, {
        isFetching: false,
        list: action.talks,
      });
    case 'FAIL_TOKEN':
      return Object.assign({}, state, {
        isFetching: false,
      });
    default:
      return state;
  }
}

export default talks;