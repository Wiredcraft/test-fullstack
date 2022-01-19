"use strict";

module.exports = {
    ...require(`./config.default.js`),
    ...require(`./config.${process.env.EGG_SERVER_ENV || 'local'}.js`)
};