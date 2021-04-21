'use strict';

const _ = require('lodash');

/**
 * @param {Egg.Application} app
 * @returns {Egg.Controller}
 */
module.exports = app => {
  class userController extends app.Controller {
    // constructor(ctx) {
    //   super(ctx);
    // }

    async test() {
      const { ctx } = this;
      const ret = {};
      ret.middlewareRet_1 = ctx.middlewareRet_1;
      ret.middlewareRet0 = ctx.middlewareRet0;
      ctx.validate({
        p1  : { type: 'int', required: true },
        test: { type: 'int', required: false },
      });
      ret.firstRet = { ..._.cloneDeep(ctx.params), ..._.cloneDeep(ctx.request.body) };

      ctx.validate({
        test2: { type: 'int', required: false },
      });
      ret.secondRet = { ..._.cloneDeep(ctx.params), ..._.cloneDeep(ctx.request.body) };

      ctx.validate({
        test3: { type: 'int', required: false },
      }, {},
      {
        body: {
          test3: '9999',
        },
      });
      ret.thirdRet = { ..._.cloneDeep(ctx.params), ..._.cloneDeep(ctx.request.body) };

      ctx.body = ret;
    }
  }
  return userController;
};
