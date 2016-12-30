const { expect } = require('chai');
const request = require('supertest');

const app = require('../../src/api/app.js');

describe('"/" endpoint: ', () => {
  it('should respond with a 200 and an html page', (done) => {
    request(app)
      .get('/')
      .expect('content-type', /text\/html/)
      .expect(200)
      .end((err, res) => {
        [
          'Gitodoro',
          'DOCTYPE',
          '<div id="app"></div>',
          '<script src="/bundle.js"'
        ].forEach((str) => expect(res.text).to.include(str));

        done();
      });
  });
});
