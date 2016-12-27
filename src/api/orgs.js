const request = require('request');

const orgs = (req, res) => {
  const { token } = req;

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
      console.error(err);

      return res.status(500).send({
        message: 'Error: ' + err,
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
