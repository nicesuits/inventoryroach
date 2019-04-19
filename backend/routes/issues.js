const issues = [
  {
    id: 1,
    status: 'Open',
    owner: 'Ravan',
    created: new Date('2016-08-15'),
    effort: 5,
    completionDate: undefined,
    title: 'Error in console when clicking Add'
  },
  {
    id: 2,
    status: 'Assigned',
    owner: 'Eddie',
    created: new Date('2016-08-16'),
    effort: 14,
    completionDate: new Date('2016-08-30'),
    title: 'Missing bottom border on panel'
  }
];

module.exports = ({ issuesRouter }) => {
  issuesRouter.get('/issues', (ctx, next) => {
    ctx.body = issues;
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
