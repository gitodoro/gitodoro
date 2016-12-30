const { expect } = require('chai');
const request = require('supertest');
const nock = require('nock');

const app = require('../../src/api/app.js');

const loginTests = [
  'should respond with a 302 redirect to github',
  '302 redirect uri should include the correct client_id with the GITHUB_CLIENT_ID env variable',
  '302 redirect uri should include the correct redirect_uri with the BASE_URL env variable',
  '302 redirect uri should include the correct scopes'
];

const loginLocations = [
  '/github.com/login/oauth/authorize',
  'client_id=' + process.env.GITHUB_CLIENT_ID,
  'redirect_uri=' + process.env.BASE_URL + '/welcome',
  'scope=user repo read:org'
];

describe('github-oauth', () => {
  context('"/login" endpoint: ', () => {
    loginTests.forEach((test, i) => {
      it(test, (done) => {
        request(app)
          .get('/login')
          .expect(302)
          .end((err, res) => {
            expect(decodeURIComponent(res.header.location)).to.include(loginLocations[i]);
            done();
          });
      });
    });
  });

  context('"/welcome" endpoint: ', () => {
    it('should respond with a 302 and set an httpOnly cookie of 1234access_token', (done) => {
      const url = 'https://github.com';
      const body = JSON.stringify({access_token: '1234access_token'});
      nock(url)
        .post('/login/oauth/access_token')
        .reply(200, body);

      request(app)
        .get('/welcome')
        .expect(302)
        .end((err, res) => {
          expect(res.headers['set-cookie'][0]).to.include('HttpOnly');
          expect(res.headers['set-cookie'][0]).to.include('1234access_token');
          done();
        });
    });
  });
});
