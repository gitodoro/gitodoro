const { assert } = require('chai');
const shot = require('shot');

const app = require('../../src/api/app.js');

describe('"/" endpoint: "', () => {
  it('should respond with a 200 and an html page', (done) => {
    const request = {
      method: 'GET',
      url: '/'
    };
    shot.inject(app, request, (res) => {
      assert.equal(res.statusCode, 200);
      assert.include(res.headers['content-type'], 'text/html');
      done();
    });
  });
});