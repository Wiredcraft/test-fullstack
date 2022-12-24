import ExtendableError from 'es6-error';

import { HTTPStatus } from './enums/http-status';

export class HTTPError extends ExtendableError {
  constructor(
    public status: HTTPStatus = HTTPStatus.INTERNAL_SERVER_ERROR,
    message = 'Internal Error',
  ) {
    super(message);
  }
}
