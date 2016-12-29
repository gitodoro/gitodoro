const request = require('request');

const repos = (req, res) => {
  const { token } = req;
  const options = {
    url: 'https://api.github.com/orgs/' + req.params.org_name + '/repos',
    headers: {
      accept: 'application/json',
      'user-agent': 'Gitodoro',
      authorization: 'token ' + token
    }
  };

  request.get(options, (err, response, body) => {
    if (err) {
      return res.status(500).send({
        message: 'Error: ' + err,
        payload: {}
      });
    }

    const payload = JSON.parse(body).map((repo) => ({
      name: repo.name,
      open_issues_count: repo.open_issues_count,
      last_update: repo.updated_at,
      repo_url: repo.url
    }));

    const data = {
      message: 'Retrieving repos for organisation: ' + req.params.org_name,
      payload
    };

    res.send(data);
  });
};

module.exports = repos;
