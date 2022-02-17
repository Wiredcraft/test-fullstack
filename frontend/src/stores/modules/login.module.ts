import { makeObservable, action } from 'mobx';
import { LoginRequest } from '../../models';
import { authService, localStorageService } from '../../services';
class LoginStore {
  // Hack news list
  constructor() {
    makeObservable(this, {
      doLogin: action,
    });
  }

  /**
   * Fetch lighting talk data
   */
  doLogin = async (request: LoginRequest) => {
    return authService.login(request).then((result) => {
      console.log('★★★★★★★★★', result);
      localStorageService.authToken = result.authToken;
    });
  };
}

export const loginStore = new LoginStore();
