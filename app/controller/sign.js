'use strict';

const Controller = require('egg').Controller;

class SignController extends Controller {
  /**
   * 获取微信 JSSDK 签名
   */
  async index() {
    const { ctx } = this;
    const response = await this.service.sign.sign();
    ctx.body = {
      code: 1,
      data: response || {},
      message: '获取信息成功',
    };
  }
}

module.exports = SignController;
