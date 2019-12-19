import request from '../utils/request';

export async function login(payload) {
  return request(`/auth/signin`, {
    method: 'POST',
    body: payload
  });
}

export async function saveToken({ accessToken }) {
  localStorage.setItem('accessToken', accessToken);
}
