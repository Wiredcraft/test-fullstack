
class ApplicationError extends Error {
    constructor(message, data) {
        super(message);
        this.name = 'ApplicationError';
        this.data = data;
        Error.captureStackTrace(this, ApplicationError);
    }
}

module.exports = ApplicationError;