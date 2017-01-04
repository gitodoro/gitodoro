const request = require('request');

const labels = (req, res) => {
  const { token } = req;
  const { issueNumber, orgName, repoName } = req.params;
  const options = {
    url: `https://api.github.com/repos/${orgName}/${repoName}/issues/${issueNumber}/labels`,
    headers: {
      accept: 'application/json',
      'user-agent': 'Gitodoro',
      authorization: `token ${token}`
    },
    json: ['in-progress']
  };
  request.post(options, (err, response, body) => {
    if (err) {
      return res.status(503).send({
        message: `Error: ${err}`,
        payload: {}
      });
    }

    res.send({
      message: `Issue ${issueNumber} started`,
      payload: {}
    });
  });
};

module.exports = labels;
