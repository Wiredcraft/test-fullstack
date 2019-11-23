function makeListTalks({ talksDb }) {
  return async function listTalks() {
    return talksDb.findAll();
  };
}

module.exports.makeListTalks = makeListTalks;
