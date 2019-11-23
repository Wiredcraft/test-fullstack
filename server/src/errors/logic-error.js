const ExtendableError = require('es6-error');

/**
 * ```javascript
 * throw new LogicError(1300, null, { data: { orderBy, asc } });
 * ```
 */
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
