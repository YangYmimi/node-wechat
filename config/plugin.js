'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  // enable redis
  redis: {
    enable: true,
    package: 'egg-redis',
  },
};
