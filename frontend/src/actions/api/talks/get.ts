export const API_TALKS_GET_FAILURE = 'API_TALKS_GET_FAILURE';
export const API_TALKS_GET_STARTED = 'API_TALKS_GET_STARTED';
export const API_TALKS_GET_SUCCESS = 'API_TALKS_GET_SUCCESS';
export const API_TALKS_GET_RESET = 'API_TALKS_GET_RESET';

export const apiTalksGetAction = (token: string, id: string): any => {
  return {
    type: API_TALKS_GET_STARTED,
    payload: {},
    token,
    id,
  };
};
