'use strict';

const _ = require('lodash');

module.exports = function(ctx, next) {
  ctx.validate({
    test_1: { type: 'int', required: false },
  });
  ctx.middlewareRet_1 = _.cloneDeep(ctx.request.body);
  return next();
};
