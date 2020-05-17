'use strict';

/**
 * 微信 jssdk 签名算法
 * @author: http://demo.open.weixin.qq.com/jssdk/sample.zip
 */

// 生成签名的随机串
const createNonceStr = function() {
  return Math.random().toString(36).substr(2, 15);
};

// 生成签名的时间戳
const createTimestamp = function() {
  return parseInt(new Date().getTime() / 1000) + '';
};

// 字典序并拼接成字符串
const raw = function(args) {
  // 从小到大排序（字典序）
  const keys = Object.keys(args).sort();
  const newArgs = {};
  keys.forEach(function(key) {
    newArgs[key.toLowerCase()] = args[key];
  });

  // URL键值对的格式拼接字符串
  let string = '';
  for (const k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }

  return string.substr(1);
};

exports.createNonceStr = createNonceStr;
exports.createTimestamp = createTimestamp;
exports.raw = raw;
