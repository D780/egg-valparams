'use strict';

const Valparams = require('valparams');

/**
 * app entry
 * @param {Egg.Application} app app entry
 */
module.exports = async app => {
  app.Valparams = Valparams;
  app.Valparams.locale(app.config.valparams.locale || 'en');
};
