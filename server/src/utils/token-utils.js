const jwt = require('jsonwebtoken');
const { CONFIG } = require('../config');

function createAuthToken(username) {
  const token = jwt.sign({ username, type: 'github' }, CONFIG.auth.jwtSecret, {
    expiresIn: CONFIG.auth.jwtExpiresIn
  });
  return token;
}

function validateToken(token) {
  return jwt.verify(token, CONFIG.auth.jwtSecret);
}

module.exports = { createAuthToken, validateToken };
