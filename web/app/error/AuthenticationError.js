
class AuthenticationError extends Error {
  constructor(message, data) {
    super(message);
    this.name = 'AuthenticationError';
    this.data = data;
    Error.captureStackTrace(this, AuthenticationError);
  }
}

module.exports = AuthenticationError;
