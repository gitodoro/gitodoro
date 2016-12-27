import request from '../utils/request.js';
import login from '../login.js';
import repos from './repos.js';

export default (orgs) => {
  document.querySelector('#app').innerHTML = `
    <div>
      <h4>Organisations</h4>
      <div class="columns organisations">
        ${
          orgs.map((org) => {
            return `
              <div id="${org.id}" name="org" class="column organisation">
                <img src="${org.image}"><span>${org.name}</span>
              </div>
            `;
          }).join('')
        }
      </div>
    </div>`;

  const orgNodes = document.querySelectorAll('div[name=org]');
  [].forEach.call(orgNodes, (org, i) => {
    org.addEventListener('click', () => {
      const orgId = orgNodes[i].id;
      request.get(`/orgs/${orgId}`)
        .then((res) => {
          if (res.status !== 200) {
            return login();
          }

          localStorage.setItem('org', orgId);
          localStorage.setItem('view', 'repos');
          repos(res.response.payload);
        });
    });
  });
};
