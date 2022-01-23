'use strict';

const validator = require('./validator');

const helper = {
  id() {
    return Math.random().toString(36).substr(2, 9);
  },

  isImage(file) {
    return /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/.test(file);
  },

  validator,
};

module.exports = helper;
