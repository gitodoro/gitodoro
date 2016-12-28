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
      console.error(err);

      return res.status(500).send({
        message: 'Error: ' + err,
        payload: {}
      });
    }
    console.log('>>>>>>>>', body);

    // const data = JSON.parse(body).map((repo) => ({
    //   id: repo.id,
    //   name: repo.name,
    //   image: repo.avatar_url
    // }));
    const data = {};
    res.send(data);
  });
};

module.exports = repos;
