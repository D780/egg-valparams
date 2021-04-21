'use strict';

/**
 * @param {Egg.Application} app
 */
module.exports = function(app) {
  app.post('*', app.middleware.check);
  app.post('/:p1/test.json', app.middleware.checkInRoute, app.controller.user.test);
};
