export const API_TALKS_DELETE_FAILURE = 'API_TALKS_DELETE_FAILURE';
export const API_TALKS_DELETE_STARTED = 'API_TALKS_DELETE_STARTED';
export const API_TALKS_DELETE_SUCCESS = 'API_TALKS_DELETE_SUCCESS';
export const API_TALKS_DELETE_RESET = 'API_TALKS_DELETE_RESET';

export const apiTalksDeleteAction = (token: string, id: string): any => {
  return {
    type: API_TALKS_DELETE_STARTED,
    payload: {},
    token,
    id,
  };
};

