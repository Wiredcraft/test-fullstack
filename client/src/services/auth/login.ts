import { client, setAccessToken, setRefreshToken } from '../client';

interface Response {
  accessToken: string;
  refreshToken: string;
}

export async function login(username: string, password: string) {
  const response = await client.post<Response>('/auth', { username, password });

  const { accessToken, refreshToken } = response;
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);

  return response;
}
