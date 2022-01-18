export const API_TALKS_PATCH_FAILURE = 'API_TALKS_PATCH_FAILURE';
export const API_TALKS_PATCH_STARTED = 'API_TALKS_PATCH_STARTED';
export const API_TALKS_PATCH_SUCCESS = 'API_TALKS_PATCH_SUCCESS';
export const API_TALKS_PATCH_RESET = 'API_TALKS_GET_RESET';

export const apiTalksPatchAction = (
    token: string, id: string, payload: any,
): any => {
  return {
    type: API_TALKS_PATCH_STARTED,
    payload,
    token,
    id,
  };
};
