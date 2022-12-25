import { getRefreshToken, removeAccessToken, removeRefreshToken } from '../client';

export const logout = () => {
  const token = getRefreshToken();
  if (!token) return;

  removeAccessToken();
  removeRefreshToken();
};
