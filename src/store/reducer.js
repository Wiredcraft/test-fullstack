const { CONFIG } = require('../constants/config');

export const reducer = (state, action) => {
  console.log(state, action);

  switch (action.type) {
    case 'SIGN_IN':
      const { username, accessToken } = action.payload;
      const userInfo = { username, accessToken };

      localStorage.setItem(
        CONFIG.auth.localUserInfoKey,
        JSON.stringify(userInfo)
      );
      return { ...state, userInfo };
    case 'SIGN_OUT':
      localStorage.removeItem(CONFIG.auth.localUserInfoKey);
      return { ...state, userInfo: {} };
    case 'UPDATE_TALKS':
      return { ...state, talks: action.payload };
    case 'NEW_TALK':
      return { ...state, talks: [...state.talks, action.payload] };
    case 'VOTE_TALK':
      const votedTalkId = action.payload.talkId;
      return {
        ...state,
        talks: state.talks.map(t =>
          t.id === votedTalkId
            ? { ...t, votedByMe: true, votes: t.votes + 1 }
            : { ...t }
        )
      };
    case 'UNVOTE_TALK':
      const unvotedTalkId = action.payload.talkId;
      return {
        ...state,
        talks: state.talks.map(t =>
          t.id === unvotedTalkId
            ? { ...t, votedByMe: false, votes: t.votes - 1 }
            : { ...t }
        )
      };
    case 'ERROR':
      return { ...state, error: action.payload };
  }
};
