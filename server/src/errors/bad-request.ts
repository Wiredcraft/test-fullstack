import { HTTPStatus } from './enums/http-status';
import { HTTPError } from './http-error';

export class BadRequestError extends HTTPError {
  constructor(message = 'Bad Request') {
    super(HTTPStatus.BAD_REQUEST, message);
  }
}
