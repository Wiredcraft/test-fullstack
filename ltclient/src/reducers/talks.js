// `talks` reducer will handle ALL talks related action
function talks(state = {
  isFetching: false,
  shouldFetch: true,
  list: [],
}, action) {
  switch (action.type) {
    case 'REQUEST_TALKLIST':
    case 'REQUEST_SUBMIT':
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'RECEIVE_TALKLIST':
      // TODO to add `isValid` prop if necessary
      return Object.assign({}, state, {
        isFetching: false,
        shouldFetch: false,
        list: action.talks,
      });
    case 'FAIL_TALKLIST':
      return Object.assign({}, state, {
        isFetching: false,
        shouldFetch: true,
      });
    case 'REQUEST_VOTE':
    case 'FAIL_VOTE': {
      // if we failed to vote, we need to revert...
      const list = state.list.map(talk => {
        // toggle-like vote
        // if the user did not vote the talk before, vote it.
        // if the user alredy voted the talk, we cancel it.
        if (talk.id === action.talkId) {
          talk.voted = !talk.voted;
          talk.voted ? talk.upvote++ : talk.upvote--;
        }
        return talk;
      });
      // refresh the view before making the real network request
      return Object.assign({}, state, { list });
    }
    case 'RECEIVE_USERVOTEDTALKS': {
      // TODO
      const votedTalks = action.votedTalks;
      const list = state.list.map(talk => {
        if (votedTalks.indexOf(talk.id) > -1) {
          talk.voted = true;
        }
        return talk;
      });
      return Object.assign({}, state, { list });
    }
    case 'CLEAN_USERVOTEDTALKS': {
      const list = state.list.map(talk => {
        talk.voted = false;
        return talk;
      });
      return Object.assign({}, state, { list });
    }
    case 'RECEIVE_SUBMIT': {
      // TODO put the new one at the end?
      const list = state.list.concat(action.talk);
      return Object.assign({}, state, {
        isFetching: false,
        list,
        justSubmitted: true,
      });
    }
    case '@@router/LOCATION_CHANGE':
    case 'SUBMIT_ANOTHER': // `view` will display submit form
      return Object.assign({}, state, {
        justSubmitted: false,
      });
    case 'FAIL_SUBMIT':
    case 'REQUEST_USERVOTEDTALKS':
    case 'FAIL_USERVOTEDTALKS':
    default:
      return state;
  }
}

export default talks;
