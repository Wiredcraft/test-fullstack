import { commonFetch } from '../utils';

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
function getUrlVote(userid, token) {
  return `${apiEndPoint}Votes?access_token=${token}`;
}

function requestVote() {
  return {
    type: 'REQUEST_VOTE',
  };
}

function receiveVote(json) {
  return {
    type: 'RECEIVE_VOTE',
  };
}

function failVote() {
  return {
    type: 'FAIL_VOTE',
  };
}

function vote(talkid, userid) {
  return (dispatch, getState) => {
    let token = getState().user.token;
    dispatch(requestVote());
    return commonFetch(getUrlVote(userid, token), 'POST', {voterId: userid, talkId: talkid})
      .then(res => res.json())
      .then(json => dispatch(receiveVote(json)))
      .catch(err => {
        showError(dispatch, err.message);
        dispatch(failVote());
      });
  };
}

export { fetchUserVotedTalks, vote };