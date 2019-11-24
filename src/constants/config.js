const API_SERVER = 'https://a3c159d8.ngrok.io';

export const CONFIG = {
  apiServer: API_SERVER,
  auth: {
    github: `${API_SERVER}/login/oauth/github`,
    localUserInfoKey: 'user_info'
  }
};
