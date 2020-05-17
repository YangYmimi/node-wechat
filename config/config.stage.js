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

  // set local redis config
  config.redis = {
    client: {
      host: '',
      port: 6379,
      username: '',
      password: '',
      db: 0,
    },
  };

  // set weixin config
  // 配置个人的微信测试号即可
  config.wx = {
    APPID: '',
    APPSECRET: '',
    TOKEN: '',
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
