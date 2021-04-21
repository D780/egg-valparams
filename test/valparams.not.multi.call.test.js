'use strict';

const mm     = require('egg-mock');
const assert = require('assert');

describe('test/valparams.not.multi.call.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'valparams-not-multi-call',
    });
    return app.ready();
  });

  after(() => app.close());

  describe('post', () => {
    it('should pass', () => {
      return app.httpRequest()
        .post('/666/test.json')
        .type('json')
        .send({
          test_1: '4869',
          test0 : '556',
          test  : '123456',
          test2 : '789',
        })
        .expect({
          middlewareRet_1: {
            test_1: 4869,
          },
          middlewareRet0: {
            test0: 556,
          },
          firstRet: {
            p1  : 666,
            test: 123456,
          },
          secondRet: {
            test2: 789,
          },
          thirdRet: {
            test3: 9999,
          },
        })
        .expect(200);
    });
  });
});
