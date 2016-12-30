import timer from './timer/timer.js';
import github from './github/github.js';
import login from './login.js';
import error from './error.js';

const orgName = (JSON.parse(localStorage.getItem('org')) || {}).name;
const repoName = (JSON.parse(localStorage.getItem('repo')) || {}).name;

const endpointMap = {
  orgs: '/orgs',
  repos: '/repos/' + orgName,
  issues: '/issues/' + orgName + '/' + repoName,
  timer: '/timer'
};

const view = localStorage.getItem('view') || 'orgs';

request.get(endpointMap[view] || '/orgs')
  .then((res) => {
    if (res.status === 200) {
      view === 'timer' ? timer() : github(view, res.response.payload);
    } else if (res.status === 401) {
      login();
    } else {
      error();
    }
  });

