'use strict';

const _ = require('lodash');

module.exports = (app) => {
  class userController extends app.Controller {
    constructor(ctx) {
      super(ctx);
    }

    async create() {
      const {ctx} = this;
      ctx.validate({
        system  : {type: 'string', required: false, defValue: 'account', desc: '系统名称'},
        token   : {type: 'string', required: true, desc: 'token 验证'},
        redirect: {type: 'string', required: false, desc: '登录跳转'},
        ts      : {type: 'int', required: true, desc: '请求时间戳'}
      });
      let {query, body} = ctx.request;

      ctx.body = _.assign({}, query, body);
    }

    async test() {
      const {ctx} = this;
      ctx.validate();
      let {query, body} = ctx.request;

      ctx.body = _.assign({}, query, body);
    }
  }
  return userController;
};
