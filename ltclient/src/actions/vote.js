import { when, commonFetch } from '../utils';

let apiEndPoint = 'http://localhost:3000/api/';

function getUrlUserVotedTalks(userid, token) {
  return `${apiEndPoint}AppUsers/${userid}/votes?filter[order]=voteCount%20DESC&filter[fields]=id&access_token=${token}`;
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

export { fetchUserVotedTalks };