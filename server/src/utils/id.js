const cuid = require('cuid');

const ID = Object.freeze({
  makeId: cuid,
  isValidId: cuid.isCuid
});

module.exports.ID = ID;
