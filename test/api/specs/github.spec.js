const request = require('supertest');
const nock = require('nock');
const { expect } = require('chai');
const { repeat } = require('ramda');

const app = require('../../../src/api/app.js');
const organisationsResponse = require('../fixtures/organisations.js');
const reposResponse = require('../fixtures/repos.js');
const issuesResponse = require('../fixtures/issues.js');
const issuesPayload = require('../fixtures/issues_payload.js');

const testOrg = 'testOrg';
const testRepo = 'testRepo';
const testIssueNumber = 10;

const unauthorisedTest = (endpoint) => {
  it('should respond with a 401 Unauthorized when there is no cookie holding the access_token', (done) => {
    request(app)
      .get(endpoint)
      .expect(401, done);
  });
};

const serviceUnavailableTest = (mockEndpoint, endpoint) => {
  it('should respond with a 503 Service Unavailable if there is an error from github request', (done) => {
    nock('https://api.github.com')
      .get(mockEndpoint)
      .replyWithError('something awful happened');

    request(app)
      .get(endpoint)
      .set('cookie', 'token=accesstoken1234')
      .expect(503, done);
  });
};

describe('github endpoints', () => {
  context('"/orgs" endpoint: ', () => {
    unauthorisedTest('/orgs');
    serviceUnavailableTest('/user/orgs', '/orgs');

    it('should respond with a 200 and a payload of: array of organisations (objects)', (done) => {
      nock('https://api.github.com')
        .get('/user/orgs')
        .reply(200, organisationsResponse);

      request(app)
        .get('/orgs')
        .set('cookie', 'token=accesstoken1234')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.equal({
            message: 'Retrieving organisations',
            payload: repeat({
              id: 1,
              image: 'https://github.com/images/error/octocat_happy.gif',
              name: 'github'
            }, 3)
          });
          done();
        });
    });
  });

  context('"/repos/:org_name" endpoint: "', () => {
    unauthorisedTest('/repos/' + testOrg);
    serviceUnavailableTest('/orgs/' + testOrg + '/repos', '/repos/' + testOrg);

    it('should respond with a 200 and a payload of: array of repos (objects)', (done) => {
      nock('https://api.github.com')
        .get('/orgs/' + testOrg + '/repos')
        .reply(200, reposResponse);

      request(app)
        .get('/repos/' + testOrg)
        .set('cookie', 'token=accesstoken1234')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.equal({
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

  context('"/issues/:org_name/:repo_name" endpoint: ', () => {
    unauthorisedTest('/issues/' + testOrg + '/' + testRepo);
    serviceUnavailableTest('/repos/' + testOrg + '/' + testRepo + '/issues', '/issues/' + testOrg + '/' + testRepo);

    it('should respond with 200 and payload of: array of repos (objects)', (done) => {
      nock('https://api.github.com')
        .get('/repos/' + testOrg + '/' + testRepo + '/issues')
        .reply(200, issuesResponse);

      request(app)
        .get('/issues/' + testOrg + '/' + testRepo)
        .set('cookie', 'token=accesstoken1234')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.equal({
            message: 'Retrieving issues for repo: testRepo',
            payload: issuesPayload
          });
          done();
        });
    });
  });
  context('"/start/:org_name/:repo_name/:issue_number" endpoint: ', () => {
    unauthorisedTest('/start/' + testOrg + '/' + testRepo + '/' + testIssueNumber);
    serviceUnavailableTest(
      '/repos/' + testOrg + '/' + testRepo + '/issues/' + testIssueNumber + 'labels',
      '/start/' + testOrg + '/' + testRepo + '/' + testIssueNumber
    );

    it('should respond with 200 and payload of: array of repos (objects)', (done) => {
      nock('https://api.github.com')
        .post('/repos/' + testOrg + '/' + testRepo + '/issues/' + testIssueNumber + '/labels')
        .reply(200, issuesResponse);

      request(app)
        .get('/start/' + testOrg + '/' + testRepo + '/' + testIssueNumber)
        .set('cookie', 'token=accesstoken1234')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.equal({
            message: 'Issue ' + testIssueNumber + ' started',
            payload: {}
          });
          done();
        });
    });
  });
  context('"/stop/:org_name/:repo_name/:issue_number" endpoint: ', () => {
    unauthorisedTest('/stop/' + testOrg + '/' + testRepo + '/' + testIssueNumber);
    serviceUnavailableTest(
      '/repos/' + testOrg + '/' + testRepo + '/issues/' + testIssueNumber + 'labels/in-progress',
      '/stop/' + testOrg + '/' + testRepo + '/' + testIssueNumber
    );

    it('should respond with 200 and payload of: array of repos (objects)', (done) => {
      nock('https://api.github.com')
        .delete('/repos/' + testOrg + '/' + testRepo + '/issues/' + testIssueNumber + '/labels/in-progress')
        .reply(200, issuesResponse);

      request(app)
        .get('/stop/' + testOrg + '/' + testRepo + '/' + testIssueNumber)
        .set('cookie', 'token=accesstoken1234')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.equal({
            message: 'Issue ' + testIssueNumber + ' stopped',
            payload: {}
          });
          done();
        });
    });
  });
});
