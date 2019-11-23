const talksDb = require('../data-access/talks-db');
const { makeCreateTalk } = require('./create-talk');
const { makeListTalks } = require('./list-talks');
const { makeVoteTalks } = require('./vote-talk');

const createTalk = makeCreateTalk({ talksDb });
const listTalks = makeListTalks({ talksDb });
const { voteTalk, unVoteTalk } = makeVoteTalks({ talksDb });

module.exports = { createTalk, listTalks, voteTalk, unVoteTalk };
