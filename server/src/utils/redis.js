const Redis = require('ioredis');
const { CONFIG } = require('../config');

const redis = new Redis({
  host: CONFIG.redis.HOST,
  port: CONFIG.redis.PORT,
  password: CONFIG.redis.PASS,
  db: CONFIG.redis.DB,
  // This will decrease performance significantly
  showFriendlyErrorStack: CONFIG.isDev,
  retryStrategy: times => Math.min(times * 50, 2000)
});

redis.on('connect', function() {
  console.log(
    `Redis has connected to ${CONFIG.redis.HOST}:${CONFIG.redis.PORT}`
  );
});

module.exports.redis = redis;
