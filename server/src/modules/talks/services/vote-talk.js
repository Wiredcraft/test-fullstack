function makeVoteTalks({ talksDb }) {
  async function voteTalk(talkId, userId) {
    await talksDb.vote(talkId, userId, 1);
    return talksDb.findById(talkId);
  }

  async function unVoteTalk(talkId, userId) {
    await talksDb.vote(talkId, userId, -1);
    return talksDb.findById(talkId);
  }

  return { voteTalk, unVoteTalk };
}

module.exports.makeVoteTalks = makeVoteTalks;
