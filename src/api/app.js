const express = require('express');
const path = require('path');

const githubOauth = require('./githubOauth.js');

const app = express();

require('env2')('config.env');

app.get('/build/bundle.js', (req, res) => {
  res.sendFile(path.resolve('build/bundle.js'));
});

app.use(express.static('src/public'));

app.use('/login', githubOauth.login);
app.use('/welcome', githubOauth.welcome);

module.exports = app;
