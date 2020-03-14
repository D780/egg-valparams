'use strict';

module.exports = () => {
  const config = { keys: 'test' };

  config.security = {
    ctoken: false,
    csrf  : false,
  };

  config.valparams = {
    locale        : 'zh-cn',
    allowMultiCall: true,
  };

  return config;
};
