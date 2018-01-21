const configs = {
  default: {
    logstash: {
      host: 'localhost',
      port: 7132,
      type: 'tcp'
    },
    mongodb: {
      uri: 'mongodb://localhost:27017/lighting_talk_polling'
    },
    rabbitmqUri: 'localhost:5672'
  },
  development: {

  },
  production: {

  }
}

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development'

module.exports = Object.assign(Object.assign({}, configs.default), configs[process.env.NODE_ENV])
