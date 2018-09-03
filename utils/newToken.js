let jwt = require('jsonwebtoken');

const newToken = username => {
  let expiry = new Date();
  // expiry.setDate(expiry.getDate() + 7);
  expiry.setMinutes(expiry.getMinutes() + 1);
  return jwt.sign({
    username,
    exp: Math.floor(Date.now() / 1000) + 200 * 60 // (expiry.getTime() / 1000),
  }, "MY_SECRET") // todo: var SECRET_TOKEN = process.env.SECRET_TOKEN;

};

module.exports = newToken;
