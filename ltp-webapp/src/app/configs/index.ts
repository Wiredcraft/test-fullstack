const configs = {
  default: {
    apiUrl: 'http://localhost:3000/api'
  },
  development: {

  },
  production: {

  }
}

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development'

export default Object.assign(Object.assign({}, configs.default), configs[process.env.NODE_ENV])
