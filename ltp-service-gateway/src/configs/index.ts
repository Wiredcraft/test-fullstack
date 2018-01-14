import * as fs from 'fs'
const configs = {
  default: {
    jwtExpiresIn: 60 * 60,
    jwtRS256PrivKey: fs.readFileSync('./keys/jwtRS256.key'),
    jwtRS256PubKey: fs.readFileSync('./keys/jwtRS256.key.pub'),
    mongodbUrl: 'mongodb://localhost/lighting_talk_polling',
    passwordSalt: 'P@ssW0rd' // generate a longer one in production
  },
  development: {

  },
  production: {

  }
}

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development'

export default Object.assign(Object.assign({}, configs.default), configs[process.env.NODE_ENV])
