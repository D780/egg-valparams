# egg-valparams
web参数验证工具 For egg

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-valparams.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-valparams
[travis-image]: https://img.shields.io/travis/D780/egg-valparams.svg?style=flat-square
[travis-url]: https://travis-ci.org/D780/egg-valparams
[codecov-image]: https://codecov.io/gh/D780/egg-valparams/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/D780/egg-valparams
[david-image]: https://img.shields.io/david/D780/egg-valparams.svg?style=flat-square
[david-url]: https://david-dm.org/D780/egg-valparams
[snyk-image]: https://snyk.io/test/npm/egg-valparams/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-valparams
[download-image]: https://img.shields.io/npm/dm/egg-valparams.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-valparams

查看 [valparams](https://github.com/D780/valparams) 获取具体的参数定义.

## Install
```npm i egg-valparams --save```

## How to use

## Usage

```js
// config/plugin.js
exports.valparams = {
  enable : true,
  package: 'egg-valparams'
};
```

```js
// config/config.default.js
exports.valparams = {
    locale    : 'zh-cn',
    throwError: false
  };
```

### The basic usage
```js
class XXXController extends app.Controller {
  // ...
  async XXX() {
    const {ctx} = this;
    ctx.validate({
      system  : {type: 'string', required: false, defValue: 'account', desc: '系统名称'},
      token   : {type: 'string', required: true, desc: 'token 验证'},
      redirect: {type: 'string', required: false, desc: '登录跳转'}
    });
    // if (config.throwError === false)
    if(ctx.paramErrors) {
      // get error infos from `ctx.paramErrors`;
    }
    let params = ctx.params;
    let {query, body} = ctx.request;
    // ctx.params        = validater.ret.params;
    // ctx.request.query = validater.ret.query;
    // ctx.request.body  = validater.ret.body;
    // ...
    ctx.body = query;
  }
  // ...
}
```

## License

[MIT](LICENSE)
