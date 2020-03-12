
'use strict';

const _ = require('lodash');

// 源参数数据
const ORIPARAMETERS = Symbol('Context#OriParameters');
// 验证后参数数据
const VALPARAMETERS = Symbol('Context#ValParameters');

module.exports = {
  validate,
};

/**
 * @typedef ParamsConfig
 * @type {Object}
 * @property {string}  [alias] 参数别名，定义该值，前端就用该值传参数来而不是pname
 * @property {string}  type    参数类型
 * @property {boolean} [required] 参数是否必选
 * @property {Object}  [range]    参数范围限制
 * @property {Array}   [range.in]     在指定值列表中
 * @property {*}       [range.min]    最小值|最短|最早（不同 type 参数 含义有所差异）
 * @property {*}       [range.max]    最大值|最长|最晚（不同 type 参数 含义有所差异）
 * @property {RegExp}  [range.reg]    符合指定正则表达式
 * @property {Object}  [range.schema] jsonSchema，针对JSON类型参数有效，使用ajv对参数进行格式控制
 * @property {*}       [defValue] 默认值，没传参数或参数验证出错时生效，此时会将该值赋值到相应参数上
 * @property {boolean} [trim]          是否去掉参数前后空格字符，默认false
 * @property {boolean} [allowEmptyStr] 是否允许空串变量 默认不允许， 即 XXXX?YYY= 这种路由 YYY这个参数是否接受
 * @property {boolean} [allowNull] 是否允许 Null 值变量 默认不允许，开启时 传递 x=null 或 x='null' 时，可以跳过类型检查，将 null 值直接赋予 x 参数
 * @property {string}  [desc] 参数描述 用于出错返回的提示
 */

/* eslint-disable max-len */
/**
 * ###配置参数格式并进行检测
 * rules 和 options 查阅 valparams 相关文档说明
 *
 * @param {Object.<string, {alias:string, type:string, required:boolean, range: {in: Array, min, max, reg:RegExp, schema},
 *                defValue, trim:boolean, allowEmptyStr:boolean, allowNull:boolean, desc:string}>} rules 参数配置  {@link ParamsConfig}
 * @param {Object}  options 参数之间关系配置
 * @param {Object[]} options.choices 参数挑选规则 | [{fields: ['p22', 'p23', 'p24'], count: 2, force: true}] 表示'p22', 'p23', 'p24' 参数三选二
 * @param {string[]} options.choices[].fields 涉及的参数
 * @param {number}   options.choices[].count  需要至少传 ${count} 个
 * @param {boolean}  options.choices[].force  默认 false，为 true 时，涉及的参数中只能传 ${count} 个, 为 false 时，可以多于 ${count} 个
 * @param {string[]} options.equals 相等关系，列表中参数的值必须相等
 * @param {string[]} options.compares 大小比较关系，列表中参数的值必须依次变大
 * @param {Object[]} options.cases 参数条件判断 | [{when: ['p30'], then: ['p31'], not: ['p32']}] 表示 当传了 p30 就必须传 p31 ,同时不能传p32
 * @param {Object[]} options.cases.when 条件, 有俩种写法，1 元素为字符串， 2 元素为对象。元素为字符串时，判断不关心相关字段值，只要有传即可，为对象就要符合相应要求
 * @param {string}   options.cases.when[].field 涉及的参数的名（对象）
 * @param {string}   options.cases.when[].value 涉及的参数的值（对象）需要参数的值与该值相等才为真
 * @param {string}   options.cases.when[] 涉及的参数，（字符串）只要接收到的参数有这个字段即为真
 * @param {string[]} options.cases.then 符合 when 条件时，需要必传的参数
 * @param {string[]} options.cases.not  符合 when 条件时，不能接收的参数
 * @param {Object} [data] - 参数信息 默认使用请求的 params，query，body 数据如下，有需要可以自行设置
 *                        {
 *                          params: this.params,
 *                          query : this.request.query,
 *                          body  : this.request.body
 *                        }
 * @param {Object} [data.params] params 参数
 * @param {Object} [data.query]  query 参数
 * @param {Object} [data.body]   body 参数
 *
 * @returns {Object} { err, ret: { params, query, body } }
 *
 * @this Egg.Context
 */
function validate(rules, options, data) {
  const app = this.app;
  const config = app.config.valparams;
  options = options || {};
  if (_.isUndefined(this[ORIPARAMETERS])) {
    this[ORIPARAMETERS] = {
      params: this.params,
      query : this.request.query,
      body  : this.request.body,
    };
  }
  data = data || {
    params: this[ORIPARAMETERS].params,
    query : this[ORIPARAMETERS].query,
    body  : this[ORIPARAMETERS].body,
  };
  // data.method = this.method || 'GET';
  if (rules) {
    // 如果全局配置 allowEmptyStr，则对所有没有配置 allowEmptyStr 的参数加上 allowEmptyStr 属性
    if (!_.isUndefined(config.allowEmptyStr)) {
      const allowEmptyStr = Boolean(config.allowEmptyStr);
      _.map(rules, rule => {
        if (_.isUndefined(rule.allowEmptyStr)) {
          rule.allowEmptyStr = allowEmptyStr;
        }
      });
    }
    const validater = app.Valparams.setParams(data, rules, options);
    // {
    //   sysID : {alias: 'sid', type: 'int', required: true, desc: '所属系统id'},
    //   page  : {type: 'int', required: false, default: 1, range: {min: 0} desc: '页码'},
    //   size  : {type: 'int', required: false, default: 30, desc: '页面大小'},
    //   offset: {type: 'int', required: false, default: 0, desc: '位移'}
    // }
    // );
    if (validater.err && validater.err.length) {
      if (config.throwError) {
        this.throw(422, 'Validation Failed', {
          code  : 'invalid_param',
          errors: validater.err,
        });
      } else {
        this.paramErrors = validater.err;
      }
    } else {
      // pass
      if (_.isUndefined(this[VALPARAMETERS])) {
        this[VALPARAMETERS] = {
          params: {},
          query : {},
          body  : {},
        };
      }
      if (config.allowMultiCall) {
        _.assign(this[VALPARAMETERS].params, validater.ret.params);
        _.assign(this[VALPARAMETERS].query, validater.ret.query);
        _.assign(this[VALPARAMETERS].body, validater.ret.body);
      } else {
        this[VALPARAMETERS].params = validater.ret.params;
        this[VALPARAMETERS].query = validater.ret.query;
        this[VALPARAMETERS].body = validater.ret.body;
      }

      this.paramResult = _.cloneDeep(this[VALPARAMETERS]);
      if (config.cover) {
        this.params = _.cloneDeep(this[VALPARAMETERS].params);
        this.request.query = _.cloneDeep(this[VALPARAMETERS].query);
        this.request.body = _.cloneDeep(this[VALPARAMETERS].body);
      }
    }
    return { err: this.paramErrors, ret: this.paramResult };
  }
}
