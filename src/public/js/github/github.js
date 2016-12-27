import orgs from './orgs.js';
import repos from './repos.js';
import issues from './issues.js';

export default (view, payload) => {
  if (view === 'orgs') {
    orgs(payload);
  } else if (view === 'repos') {
    repos(payload);
  } else {
    issues(payload);
  }
}
