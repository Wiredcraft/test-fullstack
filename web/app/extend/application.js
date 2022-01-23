const ApplicationError = require('../error/ApplicationError');
const ValidationError = require('../error/ValidationError');

const BROKER = Symbol('Application#broker');

module.exports = {
  get broker() {
    if (!this[BROKER]) {
      this[BROKER] = {
        call: async (action, params) => {
          const { status, data = {} } = await this.curl(this.config.service.url, {
            method: 'POST',
            contentType: 'json',
            data: { action, params },
            dataType: 'json',
          });

          if (status !== 200) {
            throw new ApplicationError('System Unknow Error');
          }

          if (!data.success) {
            if (data.name == 'ValidationError') {
              throw new ValidationError(data.message, data.data);
            }
            throw new ApplicationError(data.message, data.data);
          }
          return data.data;
        },
      };
    }
    return this[BROKER];
  },
};
