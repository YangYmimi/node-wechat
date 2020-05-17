'use strict';

const wechatHelper = require('./help');

/**
 * @synopsis 签名算法
 *
 * @param jsapi_ticket 用于签名的 jsapi_ticket
 * @param url 用于签名的 url ，注意必须动态获取，不能 hardcode
 *
 * @return
 */
const sign = function(jsapi_ticket, url) {
  // 签名用的 noncestr 和 timestamp 必须与 wx.config 中的 nonceStr 和 timestamp 相同
  // 所以这边需要将其返回到客户端
  const ret = {
    jsapi_ticket,
    nonceStr: wechatHelper.createNonceStr(),
    timestamp: wechatHelper.createTimestamp(),
    url,
  };

  // 这边需要把微信官方提供的sha加密文件引入
  // 不可以直接安装 jssha
  const jssha = require('../../vendor/sha');
  const shaObj = new jssha(wechatHelper.raw(ret), 'TEXT');
  ret.signature = shaObj.getHash('SHA-1', 'HEX');

  return ret;
};

module.exports = sign;
