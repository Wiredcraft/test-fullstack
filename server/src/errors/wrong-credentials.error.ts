import { HTTPStatus } from './enums/http-status';
import { HTTPError } from './http.error';

export class WrongCredentialsError extends HTTPError {
  constructor(message = 'Wrong Credentials') {
    super(HTTPStatus.BAD_REQUEST, message);
  }
}
