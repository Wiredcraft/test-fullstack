const NodeCache = require('node-cache');
const log4js = require('log4js');
const ApplicationError = require('./errors/ApplicationError');

class ServiceBroker {
    static getInstance() {
        if (!ServiceBroker._instance) {
            ServiceBroker._instance = new ServiceBroker();
        }
        return ServiceBroker._instance;
    }

    constructor() {
        if (ServiceBroker._instance) {
            return ServiceBroker._instance;
        }
        ServiceBroker._instance = this;

        this.started = false;

        this.services = [];

        this.logger = log4js.getLogger('broker');
        this.logger.level = 'debug';
        this.cache = new NodeCache();
    }

    loadService(schema) {
        this.services.push(
            Object.create({
                async start() {},
                logger: log4js.getLogger(schema.name),
                cache: new NodeCache(),
                ...schema
            })
        )
    }

    async call(pattern = '', params = {}) {
        if (!this.started) {
            throw new ApplicationError('Service not started yet');
        }

        const [ service, action ] = pattern.split('.');
        if (!service || !action) {
            throw new ApplicationError('Service pattern is invalid');
        }

        const instance = this.services.find(
            item => item.name == service
        );
        
        if (!instance) {
            throw new ApplicationError(`Service ${service} not found`);
        }

        if (!instance[action]) {
            throw new ApplicationError(`Action ${service}.${action} not found`);
        }

        if (typeof instance[action] == 'function') {
            return instance[action].call(instance, params);
        }

        if (typeof instance[action] == 'object' && typeof instance[action].handler == 'function') {
            return instance[action].handler.call(instance, params);
        }

        throw new ApplicationError(`Action ${service}.${action} is invalid`);
    }


    async start() {
        this.logger.info('Service is staring...');

        await Promise.all(
            this.services.map(async item => {
                try {
                    this.logger.info(`Start ${item.name} service`);
                    await item.start();
                    this.logger.info(`Start ${item.name} service success`);    
                } catch (error) {
                    this.logger.error(`Start ${item.name} service failed`);
                }
            })
        )

        this.started = true;
        this.logger.info('Service start completed');
    }
}

module.exports = ServiceBroker;