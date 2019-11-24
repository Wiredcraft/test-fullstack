function makeListTalks({ talksDb }) {
  return async function listTalks({ author, orderBy, asc, userId }) {
    return talksDb.findAll({ author, orderBy, asc, userId });
  };
}

module.exports.makeListTalks = makeListTalks;
