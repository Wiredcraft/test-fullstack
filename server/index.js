const { json } = require('micro');
const ServiceBroker = require('./ServiceBroker');

module.exports = (function() {
    const broker = ServiceBroker.getInstance();

    broker.loadService(require('./services/mail'));
    broker.loadService(require('./services/schedule'));
    broker.start();

    return async (req, res) => {
        const { action, params } = await json(req);
        try {
            broker.logger.info(`Start call action:${action} with params:${JSON.stringify(params)}`);
            const data = await broker.call(action, params);
            broker.logger.info(`End call action:${action} got response:${JSON.stringify(data)}`);

            return { 
                success: true, 
                data: data 
            };

        } catch(error) {
            broker.logger.error(`End call action:${action} with error:${error.message}`);
            return {
                success: false,
                name: error.name,
                data: error.data,
                message: error.message
            }
        }
    }
})();