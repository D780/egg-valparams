# egg-valparams
web参数验证工具 For egg

[![NPM](https://nodei.co/npm/egg-valparams.png?downloads=true)](https://nodei.co/npm/egg-valparams/)  

[![NPM version](https://img.shields.io/npm/v/egg-valparams.svg?style=flat-square)](https://npmjs.com/package/egg-valparams)

查看 [valparams](https://github.com/D780/valparams) 获取具体的参数定义.

## Install
```npm i egg-valparams --save```

## How to use

## Usage

```js
// config/plugin.js
exports.validate = {
  enable: true,
  package: 'egg-valparams',
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
