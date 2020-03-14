'use strict';

module.exports = () => {
  const config = { keys: 'test' };

  config.security = {
    ctoken: false,
    csrf  : false,
  };

  config.valparams = {
    throwError: false,
  };

  return config;
};
