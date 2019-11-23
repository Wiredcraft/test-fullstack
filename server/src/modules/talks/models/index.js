const { ID } = require('../../../utils/id');
const { md5 } = require('../../../utils/md5');
const { buildMakeTalk } = require('./talk');

// Inject current ID solution into buildMakeTalk
module.exports.makeTalk = buildMakeTalk({ ID, md5 });
