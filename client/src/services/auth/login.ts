import { client, setAccessToken, setRefreshToken } from '../client';

interface Params {
  username: string;
  password: string;
}

interface Response {
  accessToken: string;
  refreshToken: string;
}

export const login: Service<Response, Params> = async (params) => {
  const response = await client.post<Response>('/auth', params);

  const { accessToken, refreshToken } = response;
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);

  return response;
};
