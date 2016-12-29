const { expect } = require('chai');
const request = require('supertest');
const nock = require('nock');

const app = require('../../src/api/app.js');
const reposResponse = require('../fixtures/repos.js');

describe('"/repos/:org_name" endpoint: "', () => {
  const testOrg = 'testOrg';

  it('should respond with a 401 Unauthorized when there is no cookie holding the access_token', (done) => {
    request(app)
      .get('/repos/' + testOrg)
      .expect(401, done);
  });

  it('should respond with a 503 Service Unavailable if there is an error from github request', (done) => {
    nock('https://api.github.com')
      .get('/orgs/' + testOrg + '/repos')
      .replyWithError('something awful happened');

    request(app)
      .get('/repos/' + testOrg)
      .set('cookie', 'token=accesstoken1234')
      .expect(503, done);
  });

  it('should respond with a 200 and a payload of: array of repos (objects)', (done) => {
    nock('https://api.github.com')
      .get('/orgs/' + testOrg + '/repos')
      .reply(200, reposResponse);

    request(app)
      .get('/repos/' + testOrg)
      .set('cookie', 'token=accesstoken1234')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.eql({
          message: 'Retrieving repos for organisation: testOrg',
          payload: [
            {
              last_update: '2015-08-31T18:59:44Z',
              name: 'starthere',
              open_issues_count: 0,
              repo_url: 'https://api.github.com/repos/FAC6/starthere'
            },
            {
              last_update: '2016-06-13T16:36:06Z',
              name: 'facfaq',
              open_issues_count: 5,
              repo_url: 'https://api.github.com/repos/FAC6/facfaq'
            },
            {
              last_update: '2016-02-25T10:49:55Z',
              name: 'FAC7',
              open_issues_count: 13,
              repo_url: 'https://api.github.com/repos/FAC6/FAC7'
            }
          ]
        });
        done();
      });
  });
});
