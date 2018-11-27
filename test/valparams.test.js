'use strict';

const mm     = require('egg-mock');
const assert = require('assert');

describe('test/valparams.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'valparams'
    });
    return app.ready();
  });

  after(() => app.close());

  describe('get', () => {
    it('should return invalid_param when body empty', () => {
      return app.httpRequest()
        .get('/users.json')
        .type('json')
        .expect(422)
        .expect((res) => {
          assert(res.body.code === 'invalid_param');
          assert(res.body.message === 'Validation Failed');
          assert.deepEqual(res.body.errors, [
            {key: 'token', desc: 'token 验证', type: 'string', err: ['token 验证不能为空']},
            {key: 'ts', desc: '请求时间戳', type: 'int', err: ['请求时间戳不能为空']}
          ]);
        });
    });

    it('should return invalid_param when miss required params', () => {
      return app.httpRequest()
        .get('/users.json')
        .type('json')
        .send({
          system  : 'admin',
          redirect: 'http://github.com'
        })
        .expect(422)
        .expect((res) => {
          assert(res.body.code === 'invalid_param');
          assert(res.body.message === 'Validation Failed');
          assert.deepEqual(res.body.errors, [
            {key: 'token', desc: 'token 验证', type: 'string', err: ['token 验证不能为空']},
            {key: 'ts', desc: '请求时间戳', type: 'int', err: ['请求时间戳不能为空']}
          ]);
        });
    });

    it('should return invalid_param with mistask required params', () => {
      return app.httpRequest()
        .get('/users.json')
        .type('json')
        .send({
          system  : 'admin',
          token   : 'tokentokentokentokentoken',
          redirect: 'http://github.com',
          ts      : 'testtest'
        })
        .expect(422)
        .expect((res) => {
          assert(res.body.code === 'invalid_param');
          assert(res.body.message === 'Validation Failed');
          assert.deepEqual(res.body.errors, [
            {key: 'ts', desc: '请求时间戳', type: 'int', value: 'testtest', err: ['请求时间戳 的值 `testtest` 的类型不是 `int`']}
          ]);
        });
    });

    it('should pass and system use default value', () => {
      const now = Date.now();
      return app.httpRequest()
        .get('/users.json')
        .type('json')
        .send({
          token   : 'tokentokentokentokentoken',
          redirect: 'http://github.com',
          ts      : now + ''
        })
        .expect({
          system  : 'account',
          token   : 'tokentokentokentokentoken',
          redirect: 'http://github.com',
          ts      : now
        })
        .expect(200);
    });

    it('should pass without use validate and have nochange with params', () => {
      const now = Date.now();
      return app.httpRequest()
        .get('/test.json')
        .type('json')
        .send({
          token   : 'tokentokentokentokentoken',
          redirect: 'http://github.com',
          ts      : now + ''
        })
        .expect({
          token   : 'tokentokentokentokentoken',
          redirect: 'http://github.com',
          ts      : now + ''
        })
        .expect(200);
    });
  });
});
