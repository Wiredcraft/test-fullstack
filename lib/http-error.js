export default class HTTPError extends Error {
  constructor(statusCode = 500, message) {
    super(message);
    this.statusCode = statusCode;
  }
}
