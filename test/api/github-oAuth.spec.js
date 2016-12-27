const { assert } = require('chai');
const shot = require('shot');
const nock = require('nock');

const app = require('../../src/api/app.js');

describe('"/login" endpoint: "', () => {
  it('should respond with a 302 redirect to github', (done) => {
    const request = {
      method: 'GET',
      url: '/login'
    };
    shot.inject(app, request, (res) => {
      assert.equal(res.statusCode, 302);
      const actual = res.headers.location.split('?')[0];
      const expected = 'https://github.com/login/oauth/authorize';
      assert.equal(actual, expected);
      done();
    });
  });
  it('302 redirect uri should include the correct client_id with the GITHUB_CLIENT_ID env variable', (done) => {
    const request = {
      method: 'GET',
      url: '/login'
    };
    shot.inject(app, request, (res) => {
      const actual = res.headers.location.split('?')[1].split('&')[0];
      const expected = 'client_id=' + process.env.GITHUB_CLIENT_ID;
      assert.equal(actual, expected);
      done();
    });
  });
  it('302 redirect uri should include the correct redirect_uri with the BASE_URL env variable', (done) => {
    const request = {
      method: 'GET',
      url: '/login'
    };
    shot.inject(app, request, (res) => {
      const actual = decodeURIComponent(res.headers.location).split('?')[1].split('&')[1];
      const expected = 'redirect_uri=' + process.env.BASE_URL + '/welcome';
      assert.equal(actual, expected);
      done();
    });
  });
  it('302 redirect uri should include the correct scopes', (done) => {
    const request = {
      method: 'GET',
      url: '/login'
    };
    shot.inject(app, request, (res) => {
      const actual = decodeURIComponent(res.headers.location).split('?')[1].split('&')[2];
      const expected = 'scope=' + 'user repo read:org';
      assert.equal(actual, expected);
      done();
    });
  });
});

describe('"/welcome" endpoint: "', () => {
  it('should respond with a 302 and set an httpOnly cookie of 1234access_token', (done) => {
    const request = {
      method: 'GET',
      url: '/welcome'
    };
    const url = 'https://github.com';
    const body = JSON.stringify({access_token: '1234access_token'});
    nock(url)
      .post('/login/oauth/access_token')
      .reply(200, body);

    shot.inject(app, request, (res) => {
      assert.equal(res.statusCode, 302);
      const actual = res.headers['set-cookie'];
      assert.include(actual, 'HttpOnly');
      assert.include(actual, '1234access_token');
      done();
    });
  });
});
