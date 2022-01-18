
export const API_VOTE_POST_FAILURE = 'API_VOTE_POST_FAILURE';
export const API_VOTE_POST_STARTED = 'API_VOTE_POST_STARTED';
export const API_VOTE_POST_SUCCESS = 'API_VOTE_POST_SUCCESS';
export const API_VOTE_POST_RESET = 'API_VOTE_POST_RESET';

export const apiVotePostAction = (
    token: string, id: string, payload: any,
): any => {
  return {
    type: API_VOTE_POST_STARTED,
    payload,
    token,
    id,
  };
};
