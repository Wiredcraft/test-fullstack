
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';

        Error.captureStackTrace(this, MyError)
    }
}

module.exports = ValidationError;