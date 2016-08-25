import { commonFetch } from '../utils';
import { showError } from './error';

let apiEndPoint = 'http://localhost:3000/api/';

/* User voted talks */
function getUrlUserVotedTalks(userid, token) {
  return `${apiEndPoint}AppUsers/${userid}/voted?filter[order]=voteCount%20DESC&filter[fields]=id&access_token=${token}`;
}

function requestUserVotedTalks() {
  return {
    type: 'REQUEST_USERVOTEDTALKS',
  };
}

function receiveUserVotedTalks(json) {
  let votedTalks = json.map(item => item.id);
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

function fetchUserVotedTalks(userid) {
  return (dispatch, getState) => {
    let token = getState().user.token;
    dispatch(requestUserVotedTalks());
    return commonFetch(getUrlUserVotedTalks(userid, token))
      .then(res => res.json())
      .then(json => dispatch(receiveUserVotedTalks(json)))
      .catch(err => {
        showError(dispatch, err.message);
        dispatch(failUserVotedTalks());
      });
  };
}

/* Vote */
function getUrlVote(token) {
  return `${apiEndPoint}Votes/upvote?access_token=${token}`;
}

function requestVote(talkId) {
  return {
    type: 'REQUEST_VOTE',
    talkId
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
    talkId
  };
}

function vote(talkId) {
  return (dispatch, getState) => {
    let { token, userId } = getState().user;
    if (!token) {
      showError(dispatch, 'You can only vote after you logged in');
      return;
    }
    dispatch(requestVote(talkId));
    return commonFetch(getUrlVote(token), 'POST', {voterId: userId, talkId})
      .then(res => res.json())
      // .then(json => dispatch(receiveVote(json))) // this is not necessary
      .then(json => {
        if(json.talkId !== talkId) {
          throw new Error('Failed to vote');
        }
      })
      .catch(err => {
        showError(dispatch, err.message);
        dispatch(failVote(talkId));
      });
  };
}

export { fetchUserVotedTalks, vote };