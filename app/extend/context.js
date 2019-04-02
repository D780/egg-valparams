'use strict';

const _ = require('lodash');

module.exports = {
  validate,
};

/**
 * ###配置参数格式并进行检测
 * rules 和 options 查阅 valparams 相关文档说明
 * @param {Object} rules {pname:{alias,type,required,range:{in,min,max,reg},defValue,allowEmptyStr,desc[,detail]}}
 * @param {String} rules.pname 参数名，同时也是验证后使用的变量名
 * @param {String} rules.pname.alias 参数别名，定义该值，前端就用该值传参数来而不是pname
 * @param {String} rules.pname.type 参数类型
 * @param {String} rules.pname.required 参数是否必选
 * @param {String} rules.pname.range 参数范围限制 可用{in,min,max,reg} 分别对应 包含 最小 最大 正则
 *                                        其中minmax对于不同类型有不同的意思，比如int是值大小，string是字符串长度
 * @param {String} rules.pname.defValue 参数变量
 * @param {String} rules.pname.allowEmptyStr 是否允许空串变量 默认不允许， 即 XXXX?YYY= 这种路由 YYY这个参数是否接受，默认这种情况认为没有传该参数
 * @param {String} rules.pname.desc 参数描述 用于出错返回的提示
 * @param {Object} options [{choices:[{fields,count,force}],equals:[],compares:[]]
 * @param {Object} [data] - 参数信息 默认使用请求的 params，query，body 数据如下，有需要可以东西设置
 *                        {
 *                          params: this.params,
 *                          query : this.request.query,
 *                          body  : this.request.body
 *                        }
 */
function validate(rules, options, data) {
  options = options || {};
  data = data || {
    params: this.params,
    query : this.request.query,
    body  : this.request.body,
  };
  data.method = this.method || 'GET';
  if (rules) {
    const validater = this.app.Valparams.setParams(data, rules, options);
    // {
    //   sysID : {alias: 'sid', type: 'int', required: true, desc: '所属系统id'},
    //   page  : {type: 'int', required: false, default: 1, range: {min: 0} desc: '页码'},
    //   size  : {type: 'int', required: false, default: 30, desc: '页面大小'},
    //   offset: {type: 'int', required: false, default: 0, desc: '位移'}
    // }
    // );
    if (validater.err && validater.err.length) {
      if (this.app.config.valparams.throwError) {
        this.throw(400, 'Validation Failed', {
          code  : 'invalid_param',
          errors: validater.err,
        });
      } else {
        this.paramErrors = validater.err;
      }
    } else {
      // pass
      this.params = validater.ret.params;
      this.request.query = validater.ret.query;
      this.request.body = validater.ret.body;
      _.assign(this.request.query, validater.ret.query);
    }
  }
}
