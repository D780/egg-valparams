'use strict';

const _ = require('lodash');

module.exports = function(ctx, next) {
  ctx.validate({
    test0: { type: 'int', required: false },
  });
  ctx.middlewareRet0 = _.cloneDeep(ctx.request.body);
  return next();
};
