import { APP_URL } from '../constants';
import { requestOpts, requestApi } from '../helpers';


export function authUserApi(authType, body) {
  return requestApi(`${APP_URL}/api/${authType}`, requestOpts('POST', body));
};