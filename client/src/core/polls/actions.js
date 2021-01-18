import * as TYPES from '../constants';

export const pollActions = {

  getPolls: () => ({
    type: TYPES.GET_POLLS
  }),

  getPollsSuccess: ({ polls }) => ({
    type: TYPES.GET_POLLS_SUCCESS,
    payload: {
      polls
    }
  }),

  getPollsFailure: error => ({
    type: TYPES.GET_POLLS_FAILURE,
    payload: {
      error
    }
  }),

  postPoll: ({ title }, { resolve, reject }) => ({
    type: TYPES.POST_POLL,
    payload: {
      title,
      resolve,
      reject
    }
  }),

  postPollSuccess: ({ poll, message }) => ({
    type: TYPES.POST_POLL_SUCCESS,
    payload: {
      poll,
      message
    }
  }),

  postPollFailure: error => ({
    type: TYPES.POST_POLL_FAILURE,
    payload: {
      error
    }
  }),

  updatePollVote: ({ votes },{ resolve, reject }) => ({
    type: TYPES.UPDATE_POLL_VOTE,
    payload: {
      votes,
      resolve,
      reject
    }
  })

};

export const pollRequestActions = {
  getPending: pollActions.getPolls,
  getFulfilled: pollActions.getPollsSuccess,
  getFailed: pollActions.getPollsFailure,
  postPending: pollActions.postPoll,
  postFulfilled: pollActions.postPollSuccess,
  postFailed: pollActions.postPollFailure,
  updateVotePending: pollActions.updatePollVote,
};
