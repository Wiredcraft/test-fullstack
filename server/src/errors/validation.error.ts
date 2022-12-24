import { BadRequestError } from './bad-request.error';

export class ValidationError extends BadRequestError {
  constructor(public details: unknown, message = 'Validation Error') {
    super(message);
  }
}
