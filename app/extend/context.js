'use strict';

module.exports = {
  validate
};
/**
 * validate data with rules
 *
 * @param  {Object} rules  - Valparams 规则设置 see ./lib/Valparams/wiki.md
 * @param  {Object} [data] - validate target, default to
 *                                            {
   *                                               params: this.params,
   *                                               query : this.request.query,
   *                                               body  : this.request.body
   *                                             }
 */
function validate(rules, data) {
  data = data || {
    params: this.params,
    query : this.request.query,
    body  : this.request.body
  };
  if (rules) {
    const validater = this.app.Valparams.setParams(data, rules);
    // {
    //   sysID : {alias: 'sid', type: 'int', required: true, desc: '所属系统id'},
    //   page  : {type: 'int', required: false, default: 1, range: {min: 0} desc: '页码'},
    //   size  : {type: 'int', required: false, default: 30, desc: '页面大小'},
    //   offset: {type: 'int', required: false, default: 0, desc: '位移'}
    // }
    // );
    if (validater.err && validater.err.length) {
      if (this.app.config.valparams.throwError) {
        this.throw(422, 'Validation Failed', {
          code  : 'invalid_param',
          errors: validater.err
        });
      }
      else {
        this.paramErrors = validater.err;
      }
    }
    else {
      // pass
      this.params        = validater.ret.params;
      this.request.query = validater.ret.query;
      this.request.body  = validater.ret.body;
    }
  }
}
