const { makeTalk } = require('../models');

function makeCreateTalk({ talksDb }) {
  return async function createTalk(talk) {
    const newTalk = await makeTalk(talk);
    const exists = await talksDb.findByHash({ hash: newTalk.getHash() });
    if (exists) {
      return exists;
    }

    talksDb.insert({
      id: newTalk.getId(),
      hash: newTalk.getHash(),
      title: newTalk.getTitle(),
      description: newTalk.getDescription(),
      author: newTalk.getAuthor(),
      ctime: newTalk.getCTime()
    });
  };
}

module.exports.makeCreateTalk = makeCreateTalk;
