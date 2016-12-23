const qs = require('querystring');
const request = require('request');

const githubOauth = {
  login: (req, res) => {
    const params = {
      client_id: process.env.GITHUB_CLIENT_ID,
      redirect_uri: process.env.BASE_URL + '/welcome',
      scope: 'user repo read:org'
    };
    res.redirect(
      'https://github.com/login/oauth/authorize?' + qs.stringify(params)
    );
  },
  welcome: (req, res) => {
    const payload = {
      // given to you when you register your app with github
      client_id: process.env.GITHUB_CLIENT_ID,
      // given to you when you register your app with github
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      // temporary code from github in query of redirect
      code: req.query.code
    };
    const url = 'https://github.com/login/oauth/access_token';
    const headers = {
      Accept: 'application/json',
      'User-Agent': 'Gitodoro'
    };
    const options = {
      url,
      form: payload,
      headers
    };
    request.post(options, (err, response, body) => {
      if (err) {
        console.error(err);
        return;
      }

      const token = JSON.parse(body).access_token;
      const cookieOpts = {
        maxAge: 900000, // 15 mins
        httpOnly: true
      };
      res.cookie('token', token, cookieOpts).redirect('/');
    });
  }
};

module.exports = githubOauth;
