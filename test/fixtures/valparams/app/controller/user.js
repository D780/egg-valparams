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

    async create() {
      const { ctx } = this;
      ctx.validate({
        system  : { type: 'string', required: false, defValue: 'account', desc: '系统名称' },
        token   : { type: 'string', required: true, desc: 'token 验证' },
        redirect: { type: 'string', required: false, desc: '登录跳转' },
        ts      : { type: 'int', required: true, desc: '请求时间戳' },
      });
      const { query, body } = ctx.request;

      ctx.body = _.assign({}, query, body);
    }

    async test() {
      const { ctx } = this;
      ctx.validate();
      const { query, body } = ctx.request;

      ctx.body = _.assign({}, query, body);
    }
  }
  return userController;
};
