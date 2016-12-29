const { expect } = require('chai');
const request = require('supertest');
const nock = require('nock');

const app = require('../../src/api/app.js');
const issuesResponse = require('../fixtures/issues.js');

describe('"/issues/:org_name/:repo_name" endpoint: ', () => {
  const testOrg = 'testOrg';
  const testRepo = 'testRepo';

  it('should respond with 401 Unauthorized when there is no cookie holding the access token', (done) => {
    request(app)
      .get('/issues/' + testOrg + '/' + testRepo)
      .expect(401, done);
  });

  it('should respond with 503 Service Unavailable if there is an error from github request', (done) => {
    nock('https://api.github.com')
      .get('/repos/' + testOrg + '/' + testRepo + '/issues')
      .replyWithError('something awful happened');

    request(app)
      .get('/issues/' + testOrg + '/' + testRepo)
      .set('cookie', 'token=accesstoken1234')
      .expect(503, done);
  });

  it('should respond with 200 and payload of: array of repos (objects)', (done) => {
    nock('https://api.github.com')
      .get('/repos/' + testOrg + '/' + testRepo + '/issues')
      .reply(200, issuesResponse);

    request(app)
      .get('/issues/' + testOrg + '/' + testRepo)
      .set('cookie', 'token=accesstoken1234')
      .expect(200, done);
  });
});

