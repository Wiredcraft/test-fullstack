const talksDb = require('../data-access/talks-db');
const { makeCreateTalk } = require('./create-talk');
const { makeListTalks } = require('./list-talks');

const createTalk = makeCreateTalk({ talksDb });
const listTalks = makeListTalks({ talksDb });

module.exports = { createTalk, listTalks };
