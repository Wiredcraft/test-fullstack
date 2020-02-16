import { store } from '@/helpers';

const user = store.get('user') || '';
const token = store.get('token') || '';
const username = store.get('username') || '';

export default {
  state: {
    user,
    token,
    username,
  },
  reducers: {
    setUser(state, payload) {
      // expires in 3 hours
      const expires = new Date().getTime() + 1000 * 60 * 60 * 3;
      store.set('user', payload.user, expires);
      store.set('token', payload.token, expires);
      store.set('username', payload.username, expires);
      return { ...payload };
    },
    logout() {
      store.remove('user');
      store.remove('token');
      store.remove('username');
      return { user: '', username: '', token: '' };
    },
  },
};
