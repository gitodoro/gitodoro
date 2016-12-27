const { assert } = require('chai');
const shot = require('shot');

const app = require('../../src/api/app.js');

describe('Express server', () => {
  it('/ - should respond with a 200 and an html page', (done) => {
    const request = {
      method: 'GET',
      url: '/'
    };

    shot.inject(app, request, (res) => {
      assert.equal(res.statusCode, 200, 'correct!');
      done();
    });
  });
});
