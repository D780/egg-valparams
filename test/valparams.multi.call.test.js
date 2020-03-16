'use strict';

const mm     = require('egg-mock');
const assert = require('assert');

describe('test/valparams.multi.call.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'valparams-multi-call',
    });
    return app.ready();
  });

  after(() => app.close());

  describe('post', () => {
    it('should pass and result is increment', () => {
      return app.httpRequest()
        .post('/test.json')
        .type('json')
        .send({
          test : '123456',
          test2: '789',
        })
        .expect({
          firstRet: {
            test: 123456,
          },
          secondRet: {
            test : 123456,
            test2: 789,
          },
          thirdRet: {
            test : 123456,
            test2: 789,
            test3: 9999,
          },
        })
        .expect(200);
    });
  });
});
