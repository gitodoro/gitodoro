import request from './utils/request.js';

import timer from './timer/timer.js';
import github from './github/github.js';
import login from './login.js';
import error from './error.js';

const endpointMap = {
  orgs: '/orgs',
  repos: '/repos',
  issues: '/issues',
  timer: '/timer'
};

const view = localStorage.getItem('view');

request.get(endpointMap[view] || '/orgs')
  .then((res) => {
    if (res.status === 200) {
      view === 'timer' ? timer() : github(view, res.response);
    } else if (res.status === 401) {
      login();
    } else {
      error();
    }
  });

