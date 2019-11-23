const { redis } = require('../../../utils/redis');

async function findAll() {
  console.log('find all talks');
}

async function findById() {
  console.log('find by id');
}

async function findByHash(hash) {
  console.log('find by hash...', hash);
}

async function insert(talk) {
  console.log('insert new talk', talk);
}

module.exports = { findAll, findById, findByHash, insert };
