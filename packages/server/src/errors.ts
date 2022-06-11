export class HttpError extends Error {
  code: number;
  error?: unknown;

  constructor(code: number, message: string, error?: unknown) {
    super(`${code}: ${message}`);

    this.name = this.constructor.name;

    this.code = code;
    this.error = error;

    Error.captureStackTrace(this, this.constructor);
  }
}
