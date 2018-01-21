const Seneca = require('seneca')
const config = require('./configs')

var seneca = Seneca({ legacy: { logging: false }, 'logstash-logger': config.logstash })
  .use('amqp-transport')
  .use('logstash-logger')
  .use('mongo-store', config.mongodb)
  .use('entity', {mem_store: false})
  .use('./services/talk')
  .listen({
    type: 'amqp',
    pin: 'service:talks,cmd:*',
    url: config.rabbitmqUri
  })
  .ready(function () {
    seneca.log.info({message: 'core service started', timestamp: Date.now()})
  })
