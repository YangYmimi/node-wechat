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
  config.middleware = [
    'errorHandler',
  ];

  // 所有请求 url
  config.url = {
    WX_ACCESSTOKEN: 'https://api.weixin.qq.com/cgi-bin/token',
    WX_JSAPI_TICKET: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
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
