'use strict';

const mm     = require('egg-mock');

describe('test/valparams.error.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'valparams-error'
    });
    return app.ready();
  });

  after(() => app.close());

  describe('get', () => {
    it('should return errors when body empty', () => {
      return app.httpRequest()
        .get('/users.json')
        .type('json')
        .expect({
          errors:[
            {key: 'token', desc: 'token 验证', type: 'string', err: ['token 验证 is required']},
            {key: 'ts', desc: '请求时间戳', type: 'int', err: ['请求时间戳 is required']}
          ]
        })
        .expect(200);
    });
  });
});
