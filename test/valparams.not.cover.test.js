'use strict';

const mm     = require('egg-mock');
const assert = require('assert');

describe('test/valparams.not.cover.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'valparams-not-cover',
    });
    return app.ready();
  });

  after(() => app.close());

  describe('post', () => {
    it('should pass and typeof `ctx.request.query.test` is string', () => {
      const now = Date.now();
      return app.httpRequest()
        .post('/test.json')
        .type('json')
        .send({
          test: '123456',
        })
        .expect({
          ret: {
            params: {},
            query : {},
            body  : {
              test: 123456,
            },
            headers      : {},
            cookies      : {},
            signedCookies: {},
          },
          body: {
            test: '123456',
          },
        })
        .expect(200);
    });
  });
});
