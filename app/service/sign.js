'use strict';

const Service = require('egg').Service;
const request = require('../utils/request');
const sign = require('../utils/wechat/sign');
const wxRedisConstant = require('../constants/redis');

class SignService extends Service {
  /**
   * JSSDK 签名服务
   */
  async sign() {
    const { ctx, config, app } = this;
    const { url } = ctx.query;

    if (!url) {
      ctx.throw(500, '请求参数参数错误', {
        errorurl: 'SignService.Sign',
      });
    }

    let cachedTicket = await app.redis.get(wxRedisConstant.WX_SERVICE_JSAPITICKET);

    let cachedAccessToken = await app.redis.get(wxRedisConstant.WX_SERVICE_ACCESSTOKEN);

    /**
     * 1. 判断签名是否存在
     * 2. 判断签名是否有效
     */
    if (!cachedTicket) {
      /**
       * 不存在签名
       * 1. 判断 access_token 是否存在
       * 2. 存在则拿 access_token 去获取签名
       * 3. 不存在则重新获取 access_token
       */
      if (!cachedAccessToken) {
        const result = await request({
          url: config.url.WX_ACCESSTOKEN,
          params: {
            grant_type: 'client_credential',
            appid: config.wx.APPID,
            secret: config.wx.APPSECRET,
          },
        });

        if (result.access_token) {
          // 暂时设置 7000
          // 之后用 work 去更新 access_token
          cachedAccessToken = result.access_token;
          await app.redis.set(wxRedisConstant.WX_SERVICE_ACCESSTOKEN, result.access_token, 'EX', 7000);
        } else {
          ctx.throw(400, '获取access_token失败', {
            errorurl: config.url.WX_ACCESSTOKEN,
            errcode: result.errcode || '',
            errmsg: result.errmsg || '',
          });
        }
      }

      // 根据 access_token 去获取 ticket
      const result = await request({
        url: config.url.WX_JSAPI_TICKET,
        params: {
          access_token: cachedAccessToken,
          type: 'jsapi',
        },
      });

      // 成功返回的话 errcode 为 0
      if (result.errcode === 0) {
        cachedTicket = result.ticket;
        await app.redis.set(wxRedisConstant.WX_SERVICE_JSAPITICKET, result.ticket, 'EX', 7000);
      } else {
        ctx.throw(400, '获取jsapi_ticket失败', {
          errorurl: config.url.WX_JSAPI_TICKET,
          errcode: result.errcode || '',
          errmsg: result.errmsg || '',
        });
      }
    }

    // 返回签名
    return sign(cachedTicket, url);
  }
}

module.exports = SignService;
