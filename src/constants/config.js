const API_SERVER = 'http://localhost:3000';

export const CONFIG = {
  apiServer: API_SERVER,
  auth: {
    github: `${API_SERVER}/login/oauth/github`,
    localUserInfoKey: 'user_info'
  }
};
