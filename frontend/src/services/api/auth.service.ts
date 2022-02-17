import { ApiService } from '..';
import { Authorization, LoginRequest } from '../../models';

class AuthService extends ApiService {
  /**
   * Login
   * @returns
   */
  login(request: LoginRequest): Promise<Authorization> {
    return this.post(Authorization, `/login`, request);
  }
}

export const authService = new AuthService();
