const request = require('request');

const repos = (req, res) => {
  const { token } = req;
  const { orgName } = req.params;

  const options = {
    url: 'https://api.github.com/orgs/' + orgName + '/repos',
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
    const payload = JSON.parse(body).map((repo) => ({
      name: repo.name,
      open_issues_count: repo.open_issues_count,
      last_update: repo.updated_at,
      repo_url: repo.url
    }));

    const data = {
      message: 'Retrieving repos for organisation: ' + orgName,
      payload
    };

    res.send(data);
  });
};

module.exports = repos;
