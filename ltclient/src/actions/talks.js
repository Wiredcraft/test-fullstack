import { when, commonFetch } from '../utils';
import { showError } from './error';
import { intFetchUserVotedTalks } from './vote';
import { apiEndpoint } from '../constants';

function getTalkListUrl() {
  // eslint-disable-next-line max-len
  return `${apiEndpoint}Talks?filter[order]=voteCount%20DESC&filter[include]=submitter`;
}

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
  return (dispatch, getState) => {
    dispatch(requestTalkList());
    return commonFetch(getTalkListUrl())
      .then(res => res.json())
      .then(json => dispatch(receiveTalkList(json)))
      // also refresh user vote history
      .then(() => intFetchUserVotedTalks(dispatch, getState))
      .catch(err => {
        showError(dispatch, err.message);
        dispatch(failTalkList());
      });
  };
}

export { fetchTalks };
