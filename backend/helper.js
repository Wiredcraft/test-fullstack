const crypto = require('crypto');
const key = '0123456789012345';
const iv = '0123456789012345';

function encodeSession(data){
  var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  var crypted = cipher.update(JSON.stringify(data), 'utf8', 'binary');
  crypted += cipher.final('binary');
  crypted = Buffer.from(crypted, 'binary').toString('base64');
  return encodeURIComponent(crypted);
}

function decodeSession(data){
  if(!data) return {};

  try {
    data = Buffer.from(decodeURIComponent(data.match(/session=([^;]+)/)[1]), 'base64').toString('binary');
    var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    var decoded = decipher.update(data, 'binary', 'utf8');
    decoded += decipher.final('utf8');
    return JSON.parse(decoded);
  } catch (error) {
    return {}
  }
}

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

module.exports = {
  encodeSession,
  decodeSession,
  uuid
}