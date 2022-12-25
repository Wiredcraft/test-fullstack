import { client, setAccessToken, setRefreshToken } from '../client';

interface Params {
  username: string;
  password: string;
}

interface Response {
  accessToken: string;
  refreshToken: string;
}

export const login: Service<void, Params> = async (params) => {
  console.debug(params);
  console.debug(typeof params);
  const response = await client.post<Response>('/auth', params);

  const { accessToken, refreshToken } = response;
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
};
