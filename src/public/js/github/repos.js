import orgs from './orgs.js';
import issues from './issues.js';
import login from '../login.js';

export default (repos) => {
  const { image, name } = JSON.parse(localStorage.getItem('org'));
  const org_name = name;
  document.querySelector('#app').innerHTML = `
    <div>
      <button id="backToOrgs">Back To Organisations</button>
      <h4>Repos</h4>
      <div class="columns repositories">
        ${
          repos.map((repo) => {
            return `
              <div id="${repo.name}" name="repo" class="column repository">
                <img src="${image}"><span>${repo.name}</span>
              </div>
            `;
          }).join('')
        }
      </div>
    </div>
  `;

  const repoNodes = document.querySelectorAll('div[name=repo]');
  [].forEach.call(repoNodes, (repo, i) => {
    repo.addEventListener('click', () => {
      const repo_name = repoNodes[i].id;
      request.get(`/issues/${org_name}/${repo_name}`)
        .then((res) => {
          if (res.status !== 200) {
            return login();
          }

          localStorage.setItem('repo', JSON.stringify({ name: repo_name }));
          localStorage.setItem('view', 'issues');
          issues(res.response.payload);
        });
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
};
