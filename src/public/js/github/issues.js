import timer from '../timer/timer.js';
import repos from './repos.js';
import orgs from './orgs.js';
import login from '../login.js';

export default (issues) => {
  document.querySelector('#app').innerHTML = `
    <div>
      <button id="backToOrgs">Back To Organisations</button>
      <button id="backToRepos">Back To Repos</button>
      <h4>Issues</h4>

      <div class="columns issues">
        ${
          issues.map((issue) => {
            return `
              <div id="${issue.id}" name="issue" class="column issue">
                <span>${issue.name}</span>
              </div>
            `;
          }).join('')
        }
      </div>

    </div>
  `;

  const issueNodes = document.querySelectorAll('div[name=issue]');
  [].forEach.call(issueNodes, (issue, i) => {
    issue.addEventListener('click', () => {
      const issueId = issueNodes[i].id;
      localStorage.setItem('issue', issueId);
      localStorage.setItem('view', 'timer');

      timer();
    });
  });

  document.querySelector('#backToOrgs').addEventListener('click', () => {
    request.get('/orgs')
      .then((res) => {
        if (res.status !== 200) {
          return login();
        }

        localStorage.setItem('view', 'orgs');
        orgs(res.response.payload);
      });
  });

  document.querySelector('#backToRepos').addEventListener('click', () => {
    const orgName = JSON.parse(localStorage.getItem('org')).name;
    request.get('/repos/' + orgName)
      .then((res) => {
        if (res.status !== 200) {
          return login();
        }

        localStorage.setItem('view', 'repos');
        repos(res.response.payload);
      });
  });
};
