const crypto = require('crypto');

function md5(text) {
  return crypto
    .createHash('md5')
    .update(text, 'utf-8')
    .digest('hex');
}

module.exports.md5 = md5;
