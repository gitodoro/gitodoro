const { repeat } = require('ramda');
const request = require('supertest');
const nock = require('nock');
const { expect } = require('chai');

const app = require('../../src/api/app.js');
const organisationsResponse = require('../fixtures/organisations.js');

describe('"/orgs" endpoint: ', () => {
  it('should respond with a 401 Unauthorized when there is no cookie holding the access_token', (done) => {
    request(app)
      .get('/orgs')
      .expect(401, done)
  });
  it('should respond with a 503 Service Unavailable if there is an error from github request', (done) => {
    nock('https://api.github.com')
      .get('/user/orgs')
      .replyWithError('something awful happened');

    request(app)
      .get('/orgs')
      .set('cookie', 'token=accesstoken1234')
      .expect(503, done);
  });
  it('should respond with a 200 and a payload of: array of organisations (objects)', (done) => {
    nock('https://api.github.com')
      .get('/user/orgs')
      .reply(200, organisationsResponse);

    request(app)
      .get('/orgs')
      .set('cookie', 'token=accesstoken1234')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.eql(repeat({
          id: 1,
          image: 'https://github.com/images/error/octocat_happy.gif',
          name: 'github'
        }, 3));
        done();
      });
  });
});
