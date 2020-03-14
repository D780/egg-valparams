'use strict';

/**
 * @param {Egg.Application} app
 */
module.exports = function(app) {
  app.get('/users.json', app.controller.user.create);
  app.get('/test.json', app.controller.user.test);
  app.get('/test2.json', app.controller.user.testheadersCookies);
};
