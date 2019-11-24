const { redis } = require('../../../utils/redis');
const { LogicError } = require('../../../errors/logic-error');

const createSingleTalkKey = id => `talk:id:${id}`; // id to val, one for each talk (set, get), stringified object
const createHashToIdTableKey = hash => `talk:hash:${hash}`; // hash to id, one for each talk (set, get)
const createVotedUsersSetKey = id => `talk:id:${id}:voted`; // id to voted user id array set
const createUserVotedSetKey = userId => `talk:userId:${userId}:voted`; // user id to talk id set
const createAuthorToIdSetKey = userId => `talk:author:${userId}`; // user id to talk id set
const indexVotesToIdKey = `talk:index:votes`; // index votes to id, one for all (zadd, zrange)
const indexCTimeToIdKey = `talk:index:ctime`;

async function findAll({
  orderBy = 'votes',
  asc = false,
  author,
  userId
} = {}) {
  let talkIdArr;
  if (author) {
    talkIdArr = await findAllKeysByFilter({ author });
  } else {
    talkIdArr = await findAllKeysByIndex({ orderBy, asc });
  }

  const talkKeys = talkIdArr.map(id => createSingleTalkKey(id));
  if (!(talkKeys && talkKeys.length > 0)) {
    return [];
  }

  const [talkResultArr, votedTalksByMe] = await Promise.all([
    redis.mget(talkKeys),
    votedByMe(userId)
  ]);

  const talks = talkResultArr.map(t => {
    t = JSON.parse(t);
    t.votedByMe = votedTalksByMe.includes(t.id);
    return t;
  });

  return talks;
}

async function findAllKeysByIndex({ orderBy, asc }) {
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
  return talkIdArr;
}

async function findAllKeysByFilter({ author }) {
  const talkIdArr = await redis.smembers(createAuthorToIdSetKey(author));
  return talkIdArr;
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
  return talk;
}

async function insert(talk) {
  await redis
    .pipeline()
    .set(createSingleTalkKey(talk.id), JSON.stringify(talk))
    .set(createHashToIdTableKey(talk.hash), talk.id)
    .sadd(createAuthorToIdSetKey(talk.author), talk.id)
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
    await redis
      .pipeline()
      .sadd(createVotedUsersSetKey(talkId), userId) // Update voted users for the post
      .sadd(createUserVotedSetKey(userId), talkId) // Update user voted posts
      .exec();
  } else {
    await redis
      .pipeline()
      .srem(createVotedUsersSetKey(talkId), userId) // Remove specific user from voted users
      .srem(createUserVotedSetKey(userId), talkId) // Remove talk from user voted
      .exec();
  }
}

async function hasVoted(talkId, userId) {
  const isMember = await redis.sismember(
    createVotedUsersSetKey(talkId),
    userId
  );

  return isMember > 0;
}

async function votedByMe(userId) {
  if (!userId) return false;
  return redis.smembers(createUserVotedSetKey(userId));
}

async function talkExists(talkId) {
  const exists = await redis.exists(createSingleTalkKey(talkId));
  return exists > 0;
}

module.exports = { findAll, findById, findByHash, insert, vote };
