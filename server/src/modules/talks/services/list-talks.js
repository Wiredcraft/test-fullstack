function makeListTalks({ talksDb }) {
  return async function listTalks({ orderBy, asc }) {
    return talksDb.findAll({ orderBy, asc });
  };
}

module.exports.makeListTalks = makeListTalks;
