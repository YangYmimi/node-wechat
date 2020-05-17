'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 微信服务器校验
  router.get('/common/server-verification', controller.common.serverVerification);
  // JSSDK 签名
  router.get('/wx/jssdk-sign', controller.sign.index);
};
