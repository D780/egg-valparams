'use strict';
module.exports = function (app) {
  app.get('/users.json', app.controller.user.create);
  app.get('/test.json', app.controller.user.test);
};
