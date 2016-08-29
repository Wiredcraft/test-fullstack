import { commonFetch } from '../utils';
import { showError } from './error';
import { apiEndpoint } from '../constants';

/* User voted talks */
function getUrlUserVotedTalks(userId, token) {
  // eslint-disable-next-line max-len
  return `${apiEndpoint}AppUsers/${userId}/voted?filter[order]=voteCount%20DESC&filter[fields]=id&access_token=${token}`;
}

function requestUserVotedTalks() {
  return {
    type: 'REQUEST_USERVOTEDTALKS',
  };
}

function receiveUserVotedTalks(json) {
  const votedTalks = json.map(item => item.id);
  return {
    type: 'RECEIVE_USERVOTEDTALKS',
    votedTalks,
  };
}

function failUserVotedTalks() {
  return {
    type: 'FAIL_USERVOTEDTALKS',
  };
}

function intFetchUserVotedTalks(dispatch, getState, userId) {
  if (!userId) return Promise.resolve(undefined);

  const token = getState().user.token;
  dispatch(requestUserVotedTalks());
  return commonFetch(getUrlUserVotedTalks(userId, token))
    .then(res => res.json())
    .then(json => dispatch(receiveUserVotedTalks(json)))
    .catch(err => {
      showError(dispatch, err.message);
      dispatch(failUserVotedTalks());
    });
}

function fetchUserVotedTalks(userId) {
  return (dispatch, getState) => intFetchUserVotedTalks(dispatch, getState, userId);
}

/* Vote */
function getUrlVote(token) {
  return `${apiEndpoint}Votes/upvote?access_token=${token}`;
}

function requestVote(talkId) {
  return {
    type: 'REQUEST_VOTE',
    talkId,
  };
}

// This action is not needed
// function receiveVote(json) {
//   return {
//     type: 'RECEIVE_VOTE',
//   };
// }

function failVote(talkId) {
  return {
    type: 'FAIL_VOTE',
    talkId,
  };
}

function vote(talkId) {
  return (dispatch, getState) => {
    const { token, userId } = getState().user;
    if (!token) {
      return showError(dispatch, 'You can only vote after you logged in');
    }
    dispatch(requestVote(talkId));
    return commonFetch(getUrlVote(token), 'POST', { voterId: userId, talkId })
      .then(res => res.json())
      // .then(json => dispatch(receiveVote(json))) // this is not necessary
      .then(json => {
        if (json.talkId !== talkId) {
          throw new Error('Failed to vote');
        }
      })
      .catch(err => {
        showError(dispatch, err.message);
        dispatch(failVote(talkId));
      });
  };
}

export { fetchUserVotedTalks, intFetchUserVotedTalks, vote };
