'use strict';

// 这里会早于 app 加载，所以这里无法使用全局变量
const _ = require('lodash');

module.exports = (appInfo) => {
  const config = {};

  config.valparams = {};

  return config;
};