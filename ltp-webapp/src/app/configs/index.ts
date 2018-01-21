const configs = {
  default: {
    apiUrl: 'http://localhost:4000'
  },
  development: {

  },
  production: {

  }
}

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development'

export default Object.assign(Object.assign({}, configs.default), configs[process.env.NODE_ENV])
