/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1642603991207_450';

  // add your middleware config here
  config.middleware = [ "prepare" ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    appDir: path.join(appInfo.baseDir, 'app'),
    publicDir: path.join(appInfo.baseDir, 'app/public'),

    static: {
      prefix: ''
    },

    service: {
      url: "http://127.0.0.1:8000"
    }

  };

  return {
    ...config,
    ...userConfig,
  };
};
