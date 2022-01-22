const { json } = require('micro');
const ServiceBroker = require('./ServiceBroker');

module.exports = (function() {
    const broker = ServiceBroker.getInstance();

    broker.loadService(require('./services/mail'));
    broker.loadService(require('./services/schedule'));
    broker.loadService(require('./services/hacknews'));
    broker.start();

    return async (req, res) => {
        const { action, params } = await json(req);
        try {
            broker.logger.info(`Call action:${action} with params:${JSON.stringify(params)}`);
            const data = await broker.call(action, params);
            broker.logger.info(`call action:${action} success got response:${JSON.stringify(data)}`);

            return { 
                success: true, 
                data: data 
            };

        } catch(error) {
            broker.logger.error(`Call action:${action} failure with error:${error.message}`);
            return {
                success: false,
                name: error.name,
                data: error.data,
                message: error.message
            }
        }
    }
})();