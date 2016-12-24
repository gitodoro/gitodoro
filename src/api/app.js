const express = require('express');
const path = require('path');

const githubOauth = require('./githubOauth.js');
const orgs = require('./orgs.js');

const app = express();

require('env2')('config.env');

app.get('/build/bundle.js', (req, res) => {
  res.sendFile(path.resolve('build/bundle.js'));
});

app.use(express.static('src/public'));

app.get('/login', githubOauth.login);
app.get('/welcome', githubOauth.welcome);

app.get('/orgs', orgs);

module.exports = app;
