/* eslint valid-jsdoc: "off" */

'use strict';

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
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    appDir: path.join(appInfo.baseDir, 'app'),
    publicDir: path.join(appInfo.baseDir, 'app/public'),
    uploadDir: path.join(appInfo.baseDir, 'app/public/uploads'),
    avatarDir: path.join(appInfo.baseDir, 'app/public/avatars'),
    tempDir: path.join(appInfo.baseDir, 'app/public/temp'),

    static: {
      prefix: ''
    },

    siteFile: {
      '/favicon.ico': fs.readFileSync(path.join(__dirname, 'favicon.png'))
    },

    service: {
      url: "http://127.0.0.1:7000"
    }

  };

  return {
    ...config,
    ...userConfig,
  };
};
