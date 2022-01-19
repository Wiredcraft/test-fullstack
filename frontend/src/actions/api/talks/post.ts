export const API_TALKS_POST_FAILURE = 'API_TALKS_POST_FAILURE';
export const API_TALKS_POST_STARTED = 'API_TALKS_POST_STARTED';
export const API_TALKS_POST_SUCCESS = 'API_TALKS_POST_SUCCESS';
export const API_TALKS_POST_RESET = 'API_TALKS_POST_RESET';

export const apiTalksPostAction = (
    payload: any, token: string,
): any => {
  return {
    type: API_TALKS_POST_STARTED,
    payload,
    token,
  };
};

export const apiTalksPostResetAction = (): any => {
  return {
    type: API_TALKS_POST_RESET,
  };
};


