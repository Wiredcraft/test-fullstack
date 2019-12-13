const helper = require('../../backend/helper');

helper.MockRes = function () {
  const self = Object.create(null);

  self.statusCode = 200;
  self.headers = Object.create(null);
  self.body = null;
  self.write = function(data) {
    self.body = data;
  }
  self.setHeader = function(key, value) {
    self.headers[key] = value;
  }
  self.reset = function() {
    self.statusCode = 200;
    self.headers = Object.create(null);
    self.body = null;
    return self;
  }

  return self;
}

module.exports = helper;