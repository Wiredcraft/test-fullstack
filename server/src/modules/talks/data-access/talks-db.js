const { redis } = require('../../../utils/redis');
const { LogicError } = require('../../../errors/logic-error');

const createSingleTalkKey = id => `talk:id:${id}`; // id to val, one for each talk (set, get), stringified object
const createHashToIdTableKey = hash => `talk:hash:${hash}`; // hash to id, one for each talk (set, get)
const indexVotesToIdKey = `talk:index:votes`; // index votes to id, one for all (zadd, zrange)
const indexCTimeToIdKey = `talk:index:ctime`;

async function findAll() {
  // Get all ids, ordered by ctime by default
  const talkIdArr = await redis.zrangebyscore(
    indexCTimeToIdKey,
    '-inf',
    '+inf'
  );

  const talkKeys = talkIdArr.map(id => createSingleTalkKey(id));
  const talkResultArr = await redis.mget(talkKeys);
  const talks = talkResultArr.map(t => JSON.parse(t));

  return talks;
}

async function findById(id) {
  const talkResult = await redis.get(createSingleTalkKey(id));
  const talk = JSON.parse(talkResult);

  if (!(talk && talk.id)) {
    return null;
  }

  return talk;
}

async function findByHash(hash) {
  const id = await redis.get(createHashToIdTableKey(hash));
  if (!id) return null;

  const talkResult = await redis.get(createSingleTalkKey(id));
  const talk = JSON.parse(talkResult);

  // TODO: is set / get possibly returns {}? if not remove this
  if (!(talk && talk.id)) {
    return null;
  }

  return talk;
}

async function insert(talk) {
  await redis
    .pipeline()
    .set(createSingleTalkKey(talk.id), JSON.stringify(talk))
    .set(createHashToIdTableKey(talk.hash), talk.id)
    .zadd(indexVotesToIdKey, talk.votes, talk.id)
    .zadd(indexCTimeToIdKey, talk.ctime, talk.id)
    .exec();
}

/**
 * Up tick votes by 1
 */
async function vote(talkId, userId) {
  await redis.zincrby(indexVotesToIdKey, 1, talkId);
  const talkResult = await redis.get(createSingleTalkKey(talkId));
  const talk = JSON.parse(talkResult);
  talk.votes++;
  await redis.set(createSingleTalkKey(talkId), JSON.stringify(talk));
  await redis.zadd(indexVotesToIdKey, talk.votes, talkId);
  // TODO: Log user votes activities (matrix table....)
}

async function unVote(talkId, userId) {
  await redis.zincrby(indexVotesToIdKey, -1, talkId);
  const talkResult = await redis.get(createSingleTalkKey(talkId));
  const talk = JSON.parse(talkResult);
  talk.votes--;
  await redis.set(createSingleTalkKey(talkId), JSON.stringify(talk));
  await redis.zadd(indexVotesToIdKey, talk.votes, talkId);
}

module.exports = { findAll, findById, findByHash, insert, vote, unVote };
