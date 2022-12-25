import { client, getRefreshToken, setAccessToken } from '../client';

interface Params {
  token: string;
}

interface Response {
  accessToken: string;
}

export const refresh: Service<void> = async () => {
  const token = getRefreshToken();
  if (!token) return;

  const response = await client.post<Response, Params>('/auth/refresh', { token });

  const { accessToken } = response;
  setAccessToken(accessToken);
};
