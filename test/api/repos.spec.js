const { assert } = require('chai');
const shot = require('shot');
const nock = require('nock');

const app = require('../../src/api/app.js');
const reposResponse = require('../fixtures/repos.js');

describe('"/repos/:org_name" endpoint: "', () => {
  const testOrg = 'testOrg';
  it('should respond with a 401 Unauthorized when there is no cookie holding the access_token', (done) => {
    const request = {
      method: 'GET',
      url: '/repos/' + testOrg
    };
    shot.inject(app, request, (res) => {
      assert.equal(res.statusCode, 401);
      done();
    });
  });
  it('should respond with a 503 Service Unavailable if there is an error from github request', (done) => {
    const request = {
      method: 'GET',
      url: '/repos/' + testOrg,
      headers: {
        cookie: 'token=accesstoken1234'
      }
    };
    nock('https://api.github.com')
      .get('/orgs/' + testOrg + '/repos')
      .replyWithError('something awful happened');

    shot.inject(app, request, (res) => {
      assert.equal(res.statusCode, 503);
      done();
    });
  });

  it('should respond with a 200 and a payload of: array of repos (objects)', (done) => {
    const request = {
      method: 'GET',
      url: '/repos/' + testOrg,
      headers: {
        cookie: 'token=accesstoken1234'
      }
    };
    nock('https://api.github.com')
      .get('/orgs/' + testOrg + '/repos')
      .reply(200, reposResponse);

    shot.inject(app, request, (res) => {
      // console.log(res);
      assert.equal(res.statusCode, 200);
      done();
    });
  });
});
