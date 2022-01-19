const { json } = require('micro');
const ServiceBroker = require('./ServiceBroker');

module.exports = (function() {
    const broker = ServiceBroker.getInstance();

    broker.loadService(require('./services/mail'));
    broker.loadService(require('./services/schedule'));
    broker.start();

    return async (req, res) => {
        try {
            const { action, params } = await json(req);
            return {
                success: true,
                data: await broker.call(action, params)
            }
        } catch(e) {
            broker.logger.error(e.message);
            return {
                success: false,
                name: e.name,
                data: e.data,
                message: e.message
            }
        }
    }
})();