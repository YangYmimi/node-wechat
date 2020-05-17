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
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1589512117074_5417';

  // add your middleware config here
  config.middleware = [];

  config.cluster = {
    listen: {
      port: 80,
      hostname: '0.0.0.0',
    },
  };

  // set local redis config
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      db: 0,
      password: '',
    },
  };

  // set weixin config
  // 配置个人的微信测试号即可
  config.wx = {
    APPID: 'wx94ac975c48f8b178',
    APPSECRET: '454f9ec90b5748206b49fccc1b7793f7',
    TOKEN: 'Your Token',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
