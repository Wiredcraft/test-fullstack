const jwt = require('jsonwebtoken');
const { CONFIG } = require('../../../config');

function createAuthToken(login) {
  const token = jwt.sign({ login }, CONFIG.auth.jwtSecret, {
    expiresIn: CONFIG.auth.jwtExpiresIn
  });
  return token;
}

async function isValidToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, CONFIG.auth.jwtSecret, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
}

module.exports = { createAuthToken, isValidToken };
