const ExtendableError = require('es6-error');

class DataModelError extends ExtendableError {
  constructor(code, msg, extra = {}) {
    if (msg instanceof Error) {
      msg = msg.message;
    }
    super(msg);
    this.code = code;
    Object.assign(this, extra);
  }
}

module.exports.DataModelError = DataModelError;
