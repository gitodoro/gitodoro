const request = require('request');

const labels = (req, res) => {
  const { token } = req;
  const { issueNumber, orgName, repoName } = req.params;
  const options = {
    url: `https://api.github.com/repos/${orgName}/${repoName}/issues/${issueNumber}/labels/in-progress`,
    headers: {
      accept: 'application/json',
      'user-agent': 'Gitodoro',
      authorization: `token ${token}`
    }
  };
  request.delete(options, (err, response, body) => {
    if (err) {
      return res.status(503).send({
        message: `Error: ${err}`,
        payload: {}
      });
    }

    res.send({
      message: `Issue ${issueNumber} stopped`,
      payload: {}
    });
  });
};

module.exports = labels;
