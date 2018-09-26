import {api} from '../utils/api';
import {store} from '../store';

const storeKey = 'user';

export default {
  authenticated: !!store.get(storeKey),
  loggedIn() {
    return this.authenticated;
  },
  login(email, password) {
    return api.user.login({
      email,
      password
    }).then((res) => {
      if (res.status === 200) {
        store.set(storeKey, res.data);
        this.authenticated = true;
        this.injectToApi();
        return res.data;
      }
    });
  },
  logout() {
    store.remove(storeKey);
    api.access_token = '';
    this.authenticated = false;
  },
  injectToApi() {
    const user = store.get(storeKey);
    api.access_token = user.id;
  }
};
