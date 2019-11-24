import { CONFIG } from '../constants/config';

export const initialState = {
  userInfo:
    JSON.parse(localStorage.getItem(CONFIG.auth.localUserInfoKey)) || {},
  talks: []
};
