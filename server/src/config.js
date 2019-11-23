require('dotenv').config();
const ENV = process.env;

module.exports.CONFIG = {
  isDev: ENV.NODE_ENV === 'development',
  app: {
    port: ENV.APP_PORT ? Number(ENV.APP_PORT) : 3000
  },
  endpoint: {
    prefix: ENV.ENDPOINT_PREFIX
  },
  oauth: {
    github: {
      clientId: ENV.OAUTH_GITHUB_CLIENT_ID,
      clientSecret: ENV.OAUTH_GITHUB_CLIENT_SECRET
    }
  },
  redis: {
    PORT: ENV.REDIS_PORT ? Number(ENV.REDIS_PORT) : 6379,
    HOST: ENV.REDIS_HOST || '127.0.0.1',
    PASS: ENV.REDIS_PASS,
    DB: ENV.REDIS_DB ? Number(ENV.REDIS_DB) : 0
  }
};
