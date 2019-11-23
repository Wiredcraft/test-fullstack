const { makeTalk } = require('../models');

function makeCreateTalk({ talksDb }) {
  return async function createTalk(talk) {
    const newTalk = await makeTalk(talk);
    const exists = await talksDb.findByHash(newTalk.getHash());
    if (exists) {
      return exists;
    }

    await talksDb.insert({
      id: newTalk.getId(),
      hash: newTalk.getHash(),
      title: newTalk.getTitle(),
      description: newTalk.getDescription(),
      author: newTalk.getAuthor(),
      ctime: newTalk.getCTime(),
      votes: newTalk.getVotes()
    });
    const data = await talksDb.findById(newTalk.getId());
    return data;
  };
}

module.exports.makeCreateTalk = makeCreateTalk;
