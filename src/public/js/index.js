import request from './utils/request.js';

import timer from './timer.js';
import login from './login.js';
import error from './error.js';

request.get('/orgs')
  .then((res) => {
    if (res.status === 200) {
      timer(res.response);
    } else if (res.status === 401) {
      login();
    } else {
      error();
    }
  });

