const API_SERVER = process.env.API_SERVER || 'http://localhost:3000';

export const CONFIG = {
  apiServer: API_SERVER,
  auth: {
    github: `${API_SERVER}/login/oauth/github`,
    localUserInfoKey: process.env.AUTH_LOCAL_USER_INFO_KEY || 'user_info'
  }
};
