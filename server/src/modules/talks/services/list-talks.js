function makeListTalks({ talksDb }) {
  return async function listTalks({ orderBy, asc, userId }) {
    return talksDb.findAll({ orderBy, asc, userId });
  };
}

module.exports.makeListTalks = makeListTalks;
