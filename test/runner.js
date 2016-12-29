require('env2')('config.env');
require('./api/app.spec.js');
require('./api/github-oAuth.spec.js');
require('./api/orgs.spec.js');
require('./api/repos.spec.js');
require('./api/issues.spec.js');
