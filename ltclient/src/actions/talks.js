import { when, commonFetch } from '../utils';
import { showError } from './error';

const url = 'http://localhost:3000/api/Talks?filter[order]=voteCount%20DESC&filter[include]=submitter';

function requestTalkList() {
  return {
    type: 'REQUEST_TALKLIST',
  };
}

function receiveTalkList(json) {
  // preprocessing
  const talks = json.map(item => ({
    title: item.title,
    id: item.id,
    speaker: item.speaker,
    cover: item.cover,
    description: item.description,
    submitter: item.submitter.username,
    createdAt: when(item.createdAt),
    upvote: item.voteCount,
    voted: false,
  }));

  return {
    type: 'RECEIVE_TALKLIST',
    talks,
  };
}

function failTalkList() {
  return {
    type: 'FAIL_TALKLIST',
  };
}

function fetchTalks() {
  return dispatch => {
    dispatch(requestTalkList());
    return commonFetch(url)
      .then(res => res.json())
      .then(json => dispatch(receiveTalkList(json)))
      .catch(err => {
        showError(dispatch, err.message);
        dispatch(failTalkList());
      });
  };
}

export { fetchTalks };
