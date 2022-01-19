/* eslint valid-jsdoc: "off" */

'use strict';

const fs = require('fs');
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
  config.keys = appInfo.name + '_1574393434807_4495';

  // add your middleware config here
  config.middleware = ['prepare', 'captcha'];

  // add your user config here
  const userConfig = {
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

    multipart: {
      mode: 'file'
    },

    cdnDomain: 'https://img.boxopened.com',

    oss: {
      client: {
        accessKeyId: 'LTAI4GENkqXwHZ28GxxcdMEB',
        accessKeySecret: 'hbcUf32Kr1oL4tpJwfb927LhhDhZog',
        bucket: 'u2pier-public',
        endpoint: 'oss-cn-shanghai.aliyuncs.com',
        timeout: '60s'
      }
    }
  };

  return {
    ...config,
    ...userConfig,
  };
};