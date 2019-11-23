const { redis } = require('../../../utils/redis');
const { LogicError } = require('../../../errors/logic-error');

const createSingleTalkKey = id => `talk:id:${id}`; // id to val, one for each talk (set, get), stringified object
const createHashToIdTableKey = hash => `talk:hash:${hash}`; // hash to id, one for each talk (set, get)
const createVotedUsersSetKey = id => `talk:id:${id}:voted`; // id to voted user id array, a set
const indexVotesToIdKey = `talk:index:votes`; // index votes to id, one for all (zadd, zrange)
const indexCTimeToIdKey = `talk:index:ctime`;

async function findAll({ orderBy = 'ctime', asc = false } = {}) {
  let key = indexCTimeToIdKey; // default to by time
  if (orderBy === 'ctime') key = indexCTimeToIdKey;
  else if (orderBy === 'votes') key = indexVotesToIdKey;
  else throw new LogicError(1300, null, { data: { orderBy, asc } });

  // Get all ids, ordered by ctime by default
  let talkIdArr; // = await redisFunc(key, ...params);
  if (asc) {
    talkIdArr = await redis.zrangebyscore(key, '-inf', '+inf');
  } else {
    talkIdArr = await redis.zrevrangebyscore(key, '+inf', '-inf');
  }

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
async function vote(talkId, userId, votes = 1) {
  const exists = await talkExists(talkId);
  if (!exists) {
    throw new LogicError(1200);
  }
  // Check if user has voted and votes > 0 (is voting, but voted before)
  const voted = await hasVoted(talkId, userId);
  if (votes > 0 && voted) {
    return;
  }
  // Hasn't voted yet, but trying to unvote
  if (votes < 0 && !voted) {
    return;
  }

  // Proceed to vote
  await redis.zincrby(indexVotesToIdKey, votes, talkId);
  const talkResult = await redis.get(createSingleTalkKey(talkId));
  const talk = JSON.parse(talkResult);
  talk.votes += votes;

  await redis
    .pipeline()
    .set(createSingleTalkKey(talkId), JSON.stringify(talk)) // Save updated talk object
    .zadd(indexVotesToIdKey, talk.votes, talkId) // Update votes number index
    .exec();

  if (votes > 0) {
    await redis.sadd(createVotedUsersSetKey(talkId), userId); // Update voted users for the post
  } else {
    await redis.srem(createVotedUsersSetKey(talkId), userId); // Remove specific user from voted users
  }
}

async function hasVoted(talkId, userId) {
  const isMember = await redis.sismember(
    createVotedUsersSetKey(talkId),
    userId
  );

  return isMember > 0;
}

async function talkExists(talkId) {
  const exists = await redis.exists(createSingleTalkKey(talkId));
  return exists > 0;
}

module.exports = { findAll, findById, findByHash, insert, vote };
