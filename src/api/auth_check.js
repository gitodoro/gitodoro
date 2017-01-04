const qs = require('querystring');

const authCheck = (req, res, next) => {
  const { cookie } = req.headers;
  const { token } = qs.parse(cookie);
  const errorResponse = {
    message: 'No valid cookie present',
    payload: {}
  };
  req.token = token;
  !token ? res.status(401).json(errorResponse) : next();
};

module.exports = authCheck;
