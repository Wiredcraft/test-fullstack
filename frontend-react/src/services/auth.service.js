import api from './api-instance';

class AuthService {
  login(username, password) {
    return api.post('auth/login', { username, password }).then(res => {
      if (!res.data.error) {
        localStorage.setItem('user', JSON.stringify(res.data.result));
      }
      return res;
    });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(username, password) {
    return api.post('user/register', { username, password });
  }

  getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  }
}

export default new AuthService();
