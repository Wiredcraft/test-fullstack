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
    case 'FAIL_TALKLIST':
      return Object.assign({}, state, {
        isFetching: false,
      });
    case 'RECEIVE_USERVOTEDTALKS':
      //TODO
      let votedTalks = action.votedTalks;
      let list = state.list.map(talk => {
        if (votedTalks.indexOf(talk.id)) {
          talk.voted = true;
        }
        return talk;
      });
      return Object.assign({}, state, {list});
    case 'REQUEST_USERVOTEDTALKS':
    case 'FAIL_USERVOTEDTALKS':
    default:
      return state;
  }
}

export default talks;