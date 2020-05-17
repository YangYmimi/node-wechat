'use strict';

const Controller = require('egg').Controller;

class CommonController extends Controller {
  /**
   * 校验微信服务器
   * 1. 将 token, timestamp, nonce 三个参数字典序排序
   * 2. 将三个参数字符串拼接成一个字符串进行 sha1 加密
   * 3. 开发者获得加密后的字符串与 signature 进行比较，相对的话将 echostr 直接返回
   */
  async serverVerification() {
    const { ctx, config } = this;
    // 接受微信服务器传递过来的参数
    const { signature, timestamp, nonce, echostr } = ctx.query;
    const jssha = require('../vendor/sha');
    const shaObj = new jssha([ config.wx.TOKEN, timestamp, nonce ].sort().join(''), 'TEXT');
    const signStr = shaObj.getHash('SHA-1', 'HEX');

    if (`${signStr}` === `${signature}`) {
      ctx.body = echostr;
    }
    return false;

  }
}

module.exports = CommonController;
