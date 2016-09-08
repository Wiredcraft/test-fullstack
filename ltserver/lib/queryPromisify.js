'use strict';

/**
 * DB query operations promisified
 */

/* Static mothods */

function findById(Model, id) {
  return new Promise(function (resolve, reject) {
    Model.findById(id, function (err, ins) {
      if(err) reject(err);
      if (ins) {
        resolve(ins);
      }
      reject(
        'id=' + id + ' Not found'
      );
    });
  });
}

function create(Model, data) {
  return new Promise(function (resolve, reject) {
    Model.create(data, function (err, ins) {
      if(err) reject(err);
      if (ins) {
        resolve(ins);
      }
      reject(
        'Not able to create'
      );
    });
  });
}

function destroyById(Model, id) {
  return new Promise(function (resolve, reject) {
    Model.destroyById(id, function (err) {
      if(err) reject(err);
      resolve();
    });
  });
}

function findOne(Model, filter) {
  return new Promise(function (resolve, reject) {
    Model.findOne(filter, function (err, ins) {
      if(err) reject(err);
      if (ins) {
        resolve(ins);
      }
      reject(
        'Not able to find one'
      );
    });
  });
}

/* Instance mothods */

function updateAttribute(instance, prop, value) {
  return new Promise(function (resolve, reject) {
    instance.updateAttribute(prop, value, function (err, updatedInstance) {
      if(err) reject(err);
      resolve(updatedInstance);
    });
  });
}

module.exports = {
  findById: findById,
  create: create,
  destroyById: destroyById,
  findOne : findOne,
  updateAttribute: updateAttribute,
};
