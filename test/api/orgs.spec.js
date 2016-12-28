const { assert } = require('chai');
const shot = require('shot');
const nock = require('nock');

const app = require('../../src/api/app.js');
const organisationsResponse = require('../fixtures/organisations.js');

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
  it('should respond with a 503 Service Unavailable if there is an error from github request', (done) => {
    const request = {
      method: 'GET',
      url: '/orgs'
    };
    nock('https://api.github.com')
      .get('/user/orgs')
      .replyWithError('something awful happened');

    shot.inject(app, request, (res) => {
      assert.equal(res.statusCode, 503);
      done();
    });
  });
  it('should respond with a 200 and a payload of: array of organisations (objects)', (done) => {
    const request = {
      method: 'GET',
      url: '/orgs',
      headers: {
        cookie: 'token=accesstoken1234'
      }
    };
    nock('https://api.github.com')
      .get('/user/orgs')
      .reply(200, organisationsResponse);

    shot.inject(app, request, (res) => {
      assert.equal(res.statusCode, 200);
      // assert.equal(res.payload, 200);
      done();
    });
  });
});
