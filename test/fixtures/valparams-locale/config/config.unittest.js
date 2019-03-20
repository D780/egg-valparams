'use strict';

module.exports = () => {
  const config = {};

  config.security = {
    ctoken: false,
    csrf  : false,
  };

  config.valparams = {
    locale: 'zh-cn',
  };

  return config;
};
