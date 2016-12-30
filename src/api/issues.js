const request = require('request');

const issues = (req, res) => {
  const { token } = req;
  const options = {
    url: 'https://api.github.com/repos/' + req.params.org_name + '/' + req.params.repo_name + '/issues',
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

    const payload = JSON.parse(body)
      .map((issue) => ({
        id: issue.id,
        name: issue.title,
        description: issue.body,
        number: issue.number,
        labels: issue.labels.map((label) => ({
          name: label.name,
          color: label.color
        })),
        assignees: issue.assignees.map((assignee) => ({
          name: assignee.login,
          image: assignee.avatar_url
        }))
      }));

    const data = {
      message: 'Retrieving issues for repo: ' + req.params.repo_name,
      payload
    };

    res.send(data);
  });
};

module.exports = issues;
