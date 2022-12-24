import { HTTPStatus } from './enums/http-status';
import { HTTPError } from './http.error';

export class NotFoundError extends HTTPError {
  constructor(message = 'Not Found') {
    super(HTTPStatus.NOT_FOUND, message);
  }
}
