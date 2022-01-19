const path = require('path');
const VALIDATE = Symbol('Context#valiate');

module.exports = {
    get validate() {
        if (!this[VALIDATE]) {
            const schemaDir = path.join(this.app.config.appDir, 'schema');
            this[VALIDATE] = (schema) => {
                return this.helper.validator(require(schemaDir)[schema]);
            };
        }
        return this[VALIDATE];
    }
};