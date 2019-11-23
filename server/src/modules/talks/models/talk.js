const { LogicError } = require('../../../errors/logic-error');
const { CreateTalkSchema } = require('../../../schemas/create-talk-schema');

function buildMakeTalk({ ID, md5 }) {
  return async function makeTalk({
    id = ID.makeId(),
    title,
    description,
    author,
    ctime = Date.now(),
    votes = 0
  } = {}) {
    const newTalk = {
      id,
      title,
      description,
      author,
      ctime,
      votes
    };

    if (!ID.isValidId(id)) {
      throw new LogicError(1100, 'Id of the talk is invalid', {
        data: newTalk
      });
    }

    if (!author) {
      throw new LogicError(1100, 'Talk must include an author', {
        data: newTalk
      });
    }

    // Validate talk
    try {
      await CreateTalkSchema.validate(newTalk);
    } catch (err) {
      throw new LogicError(1100, 'Talk is invalid', {
        data: { talk: newTalk, errors: err.errors }
      });
    }

    let hash;
    function makeHash() {
      return md5(title + description + author);
    }

    return Object.freeze({
      getId: () => id,
      getTitle: () => title,
      getDescription: () => description,
      getAuthor: () => author,
      getCTime: () => Number(ctime),
      getVotes: () => Number(votes),
      getHash: () => hash || (hash = makeHash())
    });
  };
}

module.exports.buildMakeTalk = buildMakeTalk;
