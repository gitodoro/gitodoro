const express = require('express');
const qs = require('querystring');
const path = require('path');
const app = express();

require('env2')('config.env');

app.use(express.static('src/public'));

app.get('/build/bundle.js', (req, res) => res.sendFile(path.resolve('build/bundle.js')));

app.get('/login', (req, res) => {
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: process.env.BASE_URL + '/welcome'
  };
  res.redirect('https://github.com/login/oauth/authorize?' + qs.stringify(params));
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
