'use strict';

module.exports = () => {
  const config = { keys: 'testKeys' };

  config.security = {
    ctoken: false,
    csrf  : false,
  };

  config.valparams = {};

  return config;
};
