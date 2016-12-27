const { assert } = require('chai');
const shot = require('shot');

const app = require('../../src/api/app.js');

describe('"/orgs" endpoint: "', () => {
  it('should respond with a 401 Unauthorized when there is no cookie holding the access_token', (done) => {
    const request = {
      method: 'GET',
      url: '/orgs'
    };
    shot.inject(app, request, (res) => {
      assert.equal(res.statusCode, 401);
      done();
    });
  });
});
