'use strict';

const axios = require('axios');

axios.interceptors.response.use(
  res => {
    return Promise.resolve(res.data);
  },
  function(err) {
    // 本地没有办法连接 socket 服务
    if (err.code === 'ECONNABORTED') {
      return Promise.resolve(err);
    }

    return Promise.reject(err);
  }
);

module.exports = option => {
  const options = {
    headers: Object.assign(
      {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      option.headers
    ),
    baseURL: 'Your Base Url',
    timeout: 10000,
    ...option,
  };

  return axios(options);
};
