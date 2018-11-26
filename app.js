'use strict';

const Valparams = require('valparams');

/**
 * app entry
 */
module.exports = async (app) => {
  app.Valparams = Valparams;
  app.Valparams.locale('zh-cn');
};