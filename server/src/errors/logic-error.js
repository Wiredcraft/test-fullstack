const ExtendableError = require('es6-error');

class LogicError extends ExtendableError {
  constructor(code, msg, extra = {}) {
    if (msg instanceof Error) {
      msg = msg.message;
    }
    super(msg);
    this.code = code;
    Object.assign(this, extra);
  }
}

module.exports.LogicError = LogicError;
