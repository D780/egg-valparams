'use strict';

module.exports = () => {
  const config = {};

  config.security = {
    ctoken: false,
    csrf  : false
  };

  config.valparams = {};

  return config;
};