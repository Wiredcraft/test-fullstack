const { redis } = require('../../../utils/redis');

async function findAll() {
  console.log('find all talks');
  await redis.hgetall('talk:*');
  return [{ hello: 'world' }, { hello: 'kun' }];
}

async function findById() {
  console.log('find by id');
}

async function findByHash(hash) {
  console.log('find by hash...', hash);
}

async function insert(talk) {
  await redis.hset(`talk:${talk.id}`, talk);
  console.log('insert new talk', talk);
}

module.exports = { findAll, findById, findByHash, insert };
