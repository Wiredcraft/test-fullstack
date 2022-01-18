export const API_TALKS_LIST_FAILURE = 'API_TALKS_LIST_FAILURE';
export const API_TALKS_LIST_STARTED = 'API_TALKS_LIST_STARTED';
export const API_TALKS_LIST_SUCCESS = 'API_TALKS_LIST_SUCCESS';
export const API_TALKS_LIST_RESET = 'API_TALKS_LIST_RESET';

export const apiTalksListAction = (token: string, id?: string): any => {
  return {
    type: API_TALKS_LIST_STARTED,
    payload: {},
    token,
    id,
  };
};
