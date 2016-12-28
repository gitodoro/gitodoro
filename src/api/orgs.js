const request = require('request');
const qs = require('querystring');

const orgs = (req, res) => {
  const { cookie } = req.headers;
  const { token } = qs.parse(cookie);

  const options = {
    url: 'https://api.github.com/user/orgs',
    headers: {
      accept: 'application/json',
      'user-agent': 'Gitodoro',
      authorization: 'token ' + token
    }
  };

  request.get(options, (err, response, body) => {
    if (err) {
      return res.status(503).send({
        message: 'Error: ' + err,
        payload: {}
      });
    }

    if (!token) {
      console.log('Token undefined');

      return res.status(401).send({
        message: 'No valid cookie present',
        payload: {}
      });
    }

    res.send(JSON.parse(body).map((org) => ({
      id: org.id,
      name: org.login,
      image: org.avatar_url
    })));
  });
};

module.exports = orgs;
