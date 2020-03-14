'use strict';

/**
 * @param {Egg.Application} app
 */
module.exports = function(app) {
  app.post('/test.json', app.controller.user.test);
};
