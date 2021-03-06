import 'egg';
import _Valparams = require('valparams');

declare module 'egg' {
  // 扩展 app
  interface Application {
    Valparams: typeof _Valparams
  }

  // 扩展 context
  interface Context {
    /**
     * ###配置参数格式并进行检测
     * rules 和 options 查阅 valparams 相关文档说明
     *
     * @param {Object.<string, {from:string, alias:string, type:string, required:boolean, range: {in: Array, min, max, reg:RegExp, schema},
     *                defValue, trim:boolean, allowEmptyStr:boolean, allowNull:boolean, signed:boolean, desc:string}>} rules 参数配置
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
     * @param {Object} [data] - 参数信息 默认使用请求上下文的 method、params，query，body、headers、cookies、signedCookies 数据如下，有需要可以自行设置
     *                        {
     *                          method       : this.method,
     *                          params       : this.params,
     *                          query        : this.request.query,
     *                          body         : this.request.body,
     *                          headers      : this.headers,
     *                          cookies      : this.cookies.get(XXX, { signed: false }),
     *                          signedCookies: this.cookies.get(XXX),
     *                        }
     * @param {Object} [data.method] 请求方法
     * @param {Object} [data.params] params 参数
     * @param {Object} [data.query]  query 参数
     * @param {Object} [data.body]   body 参数
     * @param {Object} [data.headers]       headers 参数
     * @param {Object} [data.cookies]       cookies 参数
     * @param {Object} [data.signedCookies] signedCookies 参数
     *
     * @returns {Object} { err, ret: { params, query, body, headers, cookies, signedCookies } }
     *
     * @this Egg.Context
     */
    validate(rules: _Valparams.TParamConfig, options: _Valparams.TRelationOptions, data: _Valparams.TRequest): void;
    paramErrors: null|_Valparams.TErrorInfo[];
    paramResult: Omit<_Valparams.TValparams, 'all'|'raw'>;
  }

  // 扩展你的配置
  interface EggAppConfig {
    valparams: {
      /** 指定语言，默认 `en`， 自带 `en`、`zh-cn` */
      locale: string
      /** 是否覆盖上下文中对应字段（params、query、body，不包括 headers、cookies、signedCookies） */
      cover: boolean
      /** 是否允许多次调用验证（允许时，多次调用方法验证会合并结果） */
      allowMultiCall: boolean
      /** 验证到参数有误时，是否使用 `throw` 抛出错误，否则将错误信息放置于 `ctx.paramErrors` 中 */
      throwError: boolean
      /** 
       * `allowEmptyStr` 默认配置
       * 作用于所有参数配置中 `allowEmptyStr` 字段，作为配置未填写时的默认配置
       */
      allowEmptyStr: boolean
    }
  }
}

export * from 'egg';
export as namespace Egg;