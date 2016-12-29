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
             <div id="${org.name}" name="org" class="column organisation">
                <img id="${org.image}" src="${org.image}"><span>${org.name}</span>
              </div>
            `;
          }).join('')
        }
      </div>
    </div>`;

  const orgNodes = document.querySelectorAll('div[name=org]');
  [].forEach.call(orgNodes, (org, i) => {
    org.addEventListener('click', () => {
      const org_name = orgNodes[i].id;
      const org_image = document.querySelectorAll('div[name=org] img').id;
      request.get(`/repos/${org_name}`)
        .then((res) => {
          if (res.status !== 200) {
            return login();
          }

          localStorage.setItem('org', JSON.stringify({ name: org_name, image: org_image }));
          localStorage.setItem('view', 'repos');
          repos(res.response.payload);
        });
    });
  });
};
