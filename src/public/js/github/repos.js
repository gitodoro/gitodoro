import request from '../utils/request.js';
import orgs from './orgs.js';
import issues from './issues.js';
import login from './login.js';

export default (repos) => {
  document.querySelector('#app').innerHTML = `
    <div>
      <button id="backToOrgs">Back To Organisations</button>
      <h4>Repos</h4>
      <div class="columns repositories">
        ${
          repos.map((repo) => {
            return `
              <div id="${repo.id}" name="repo" class="column repository">
                <img src="${repo.img}"><span>${repo.name}</span>
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
      const repoId = repoNodes[i].id;
      request.get(`/repos/${repoId}`)
        .then((res) => {
          if (res.status !== 200) {
            return login();
          }

          localStorage.setItem('repo', repoId);
          localStorage.setItem('view', 'issues');
          issues(res.response.payload.issues);
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
