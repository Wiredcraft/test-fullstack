import { AuthConst } from '../reducer/Auth';

export function logout() {
  return {
    type: AuthConst.LOGOUT
  }
}
