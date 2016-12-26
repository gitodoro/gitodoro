const express = require('express');

const githubOauth = require('./githubOauth.js');
const orgs = require('./orgs.js');

const app = express();

require('env2')('config.env');

app.use(express.static('build'));

app.get('/login', githubOauth.login);
app.get('/welcome', githubOauth.welcome);

app.get('/orgs', orgs);

module.exports = app;
