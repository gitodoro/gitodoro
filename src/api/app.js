const express = require('express');

const githubOauth = require('./githubOauth.js');
const orgs = require('./orgs.js');
const authCheck = require('./auth-check.js');
const morgan = require('morgan');

const app = express();

require('env2')('config.env');
app.use(morgan('dev'));
app.use(express.static('build'));

app.get('/login', githubOauth.login);
app.get('/welcome', githubOauth.welcome);
app.get('/orgs', [authCheck, orgs]);

module.exports = app;
