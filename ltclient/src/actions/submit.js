import { when, commonFetch } from '../utils';
import { showError } from './error';
import { apiEndpoint } from '../constants';

function getTalkSubmitUrl(token) {
  return `${apiEndpoint}Talks?access_token=${token}`;
}

function requestSubmit() {
  return {
    type: 'REQUEST_SUBMIT',
  };
}

function receiveSubmit(json, username) {
  console.log(json);
  const talk = json;
  talk.submitter = username;
  talk.createdAt = when(talk.createdAt);
  talk.upvote = talk.voteCount;
  talk.voted = false;

  return {
    type: 'RECEIVE_SUBMIT',
    talk,
  };
}

function failSubmit() {
  return {
    type: 'FAIL_SUBMIT',
  };
}

function submit({ title, description, speaker, cover }) {
  return (dispatch, getState) => {
    const { token, userId, username } = getState().user;
    if (!token) {
      return showError(dispatch, 'You can only submit a talk after you logged in');
    }
    dispatch(requestSubmit());
    return commonFetch(getTalkSubmitUrl(token), 'POST', {
      title,
      description,
      speaker,
      cover,
      createdAt: new Date(),
      submitterId: userId,
    })
      .then(res => res.json())
      .then(json => dispatch(receiveSubmit(json, username)))
      .catch(err => {
        showError(dispatch, err.message);
        dispatch(failSubmit());
      });
  };
}

export { submit };
