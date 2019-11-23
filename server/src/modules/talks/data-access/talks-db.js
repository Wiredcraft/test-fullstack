const { redis } = require('../../../utils/redis');

const createSingleTalkKey = id => `talk:id:${id}`; // id to set, one for each talk (hset, hgetall)
const createHashToIdTableKey = hash => `talk:hash:${hash}`; // hash to id, one for each talk (set, get)
const indexVotesToIdKey = `talk:index:votes`; // index votes to id, one for all (zadd, zrange)

async function findAll() {
  console.log('find all talks');
  await redis.hgetall('talk:');
  return [{ hello: 'world' }, { hello: 'kun' }];
}

async function findById() {
  console.log('find by id');
}

async function findByHash(hash) {
  console.log('find by hash...', hash);
}

async function insert(talk) {
  await redis
    .pipeline()
    .hset(createSingleTalkKey(talk.id), talk)
    .set(createHashToIdTableKey(talk.hash), talk.id);
  console.log('insert new talk', talk);
}

/**
 * Up tick votes by 1
 */
async function vote(talkId, userId) {
  await redis.zincrby(indexVotesToIdKey, 1, talkId);
  // TODO: Log user votes activities (matrix table....)
}

async function unVote(talkId, userId) {
  await redis.zincrby(indexVotesToIdKey, -1, talkId);
}

module.exports = { findAll, findById, findByHash, insert };
