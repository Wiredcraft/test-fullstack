const { CONFIG } = require('../constants/config');

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      console.log('SIGN_IN', action);
      const { username, accessToken } = action.payload;
      const userInfo = { username, accessToken };

      localStorage.setItem(
        CONFIG.auth.localUserInfoKey,
        JSON.stringify(userInfo)
      );
      return { ...state, userInfo };
    case 'SIGN_OUT':
      localStorage.removeItem(CONFIG.auth.localUserInfoKey);
      return { ...state, userInfo: null };
    case 'UPDATE_TALKS':
      return { ...state, talks: action.payload };
    case 'NEW_TALK':
      return { ...state, talks: [...state.talks, action.payload] };
    case 'ERROR':
      console.log('ERROR', action);
      return { ...state, error: action.payload };
  }
};
