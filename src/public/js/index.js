import request from 'app/request.js';

document.getElementById('loginToGithub').addEventListener('click', () => {
  request.get('/login')
    .then((res) => console.log('RESULT: ', res))
    .catch((err) => console.log('ERROR: ', err));
});
