import { BadRequestError } from './bad-request';

export class ValidationError extends BadRequestError {
  constructor(public details: unknown, message = 'Validation Error') {
    super(message);
  }
}
