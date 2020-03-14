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
      const valparams = ctx.validate({
        test: { type: 'int', required: false },
      });
      const { body } = ctx.request;

      ctx.body = {
        ret: valparams.ret,
        body,
      };
    }
  }
  return userController;
};
