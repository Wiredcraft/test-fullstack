const Seneca = require('seneca')
const config = require('./configs')

var seneca = Seneca({ legacy: { logging: false }, 'logstash-logger': config.logstash })
seneca
  .use('amqp-transport')
  .use('logstash-logger')
  .use('mongo-store', config.mongodb)
  .use('entity', {mem_store: false})

seneca
  .use('./services/talk')

seneca
  .listen({
    type: 'amqp',
    pin: 'service:talks,cmd:*',
    url: config.rabbitmqUri
  })
  .ready(function () {
    var apple = seneca.make$('fruit')
    apple.name = 'Pink Lady'
    apple.price = 0.99
    apple.save$(function (err, apple) {
      if (err) throw err
      console.log('apple.id = ' + apple.id)
    })
  })
