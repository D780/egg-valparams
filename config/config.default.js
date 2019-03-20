'use strict';

// 这里会早于 app 加载，所以这里无法使用全局变量

module.exports = () => {
  const config = {};

  config.valparams = {
    // locale: 'zh-cn',
    throwError: true,
  };

  return config;
};
