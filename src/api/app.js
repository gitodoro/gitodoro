const express = require('express');
require('env2')('config.env');

const githubOauth = require('./githubOauth.js');
const orgs = require('./orgs.js');
const repos = require('./repos.js');
const issues = require('./issues.js');
const labels = require('./labels.js');
const authCheck = require('./auth-check.js');
const morgan = require('morgan');

const app = express();

require('env2')('config.env');
app.use(morgan('dev'));
app.use(express.static('build'));

app.get('/login', githubOauth.login);
app.get('/welcome', githubOauth.welcome);
app.get('/orgs', [authCheck, orgs]);
app.get('/repos/:orgName', [authCheck, repos]);
app.get('/issues/:orgName/:repoName', [authCheck, issues]);
app.get('/start/:orgName/:repoName/:issueNumber', [authCheck, labels]);

module.exports = app;
