const pg = require('pg');
const config = {
  user: 'leader',
  host: 'localhost',
  database: 'issuetracker'
};

module.exports = ({ issuesRouter }) => {
  issuesRouter.get('/issues', (ctx, next) => {
    ctx.body = [];
  });
  issuesRouter.post('/issues', (ctx, next) => {
    const newIssue = ctx.request.body;
    newIssue.id = issues.length + 1;
    newIssue.created = new Date();
    if (!newIssue.status) newIssue.status = 'New';
    issues.push(newIssue);
    ctx.body = issues;
  });
};
