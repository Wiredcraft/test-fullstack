
class ValidationError extends Error {
  constructor(message, data) {
    super(message);
    this.name = 'ValidationError';
    this.data = data;
    Error.captureStackTrace(this, ValidationError);
  }
}

module.exports = ValidationError;
