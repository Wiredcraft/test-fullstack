import { HTTPStatus } from './enums/http-status';
import { HTTPError } from './http-error';

export class UnauthorizedError extends HTTPError {
  constructor(message = 'Unauthorized') {
    super(HTTPStatus.UNAUTHORIZED, message);
  }
}
