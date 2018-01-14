const fs = require('fs')
const configs = {
  default: {
    jwtExpiresIn: 60 * 60,
    jwtRS256PrivKey: fs.readFileSync('./keys/jwtRS256.key'),
    jwtRS256PubKey: fs.readFileSync('./keys/jwtRS256.key.pub')
  },
  development: {

  },
  production: {

  }
}

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development'

export default Object.assign(Object.assign({}, configs.default), configs[process.env.NODE_ENV])
