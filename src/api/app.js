const express = require('express');
require('env2')('config.env');

const githubOauth = require('./githubOauth.js');
const orgs = require('./orgs.js');

const app = express();

app.use(express.static('build'));

app.get('/login', githubOauth.login);
app.get('/welcome', githubOauth.welcome);

app.get('/orgs', orgs);

module.exports = app;
