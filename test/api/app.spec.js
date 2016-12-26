import { assert } from 'chai';
import shot from 'shot';

import app from '../../src/api/app.js';

describe('Express server', () => {
  it('/ - should respond with a 200 and an html page', () => {
    const request = {
      method: 'GET',
      url: '/'
    };

    shot.inject(app, request, (res) => {
      console.log(res.headers['content-type']);
      console.log(res.statusCode);
      assert.equal(res.statusCode, 100, 'correct!');
    });
  });
});
