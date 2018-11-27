'use strict';

const Valparams = require('valparams');

/**
 * app entry
 * @param {Object} app app entry
 * @return {Promise.<void>} <void>
 */
module.exports = async (app) => {
  app.Valparams = Valparams;
  app.Valparams.locale(app.config.valparams.locale || 'en');
};
