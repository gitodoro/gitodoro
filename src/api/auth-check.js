const qs = require('querystring');

const authCheck = (req, res, next) => {
  const { cookie } = req.headers;
  const { token } = qs.parse(cookie);
  const errorResponse = {
    message: 'No valid cookie present',
    payload: {}
  };
  !token ? res.status(401).send(errorResponse) : req.token = token;
  next();
};

module.exports = authCheck;
