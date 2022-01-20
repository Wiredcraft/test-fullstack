'use strict';

const validator = require('./validator');

const helper = {
  id: function() {
    return  Math.random().toString(36).substr(2, 9);
  },

  isImage: function(file) {
    return /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/.test(file);
  },

  validator
}

module.exports = helper;