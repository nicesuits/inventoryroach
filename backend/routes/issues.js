const { Pool } = require('pg');
const config = {
  user: 'leader',
  host: 'localhost',
  database: 'issuetracker',
  port: 26257
};

// const issues = [
//   {
//     status: 'Open',
//     owner: 'Ravan',
//     created: new Date('2016-08-15'),
//     effort: 5,
//     completionDate: undefined,
//     title: 'Error in console when clicking Add'
//   },
//   {
//     status: 'Assigned',
//     owner: 'Eddie',
//     created: new Date('2016-08-16'),
//     effort: 14,
//     completionDate: new Date('2016-08-30'),
//     title: 'Missing bottom border on panel'
//   }
// ];

module.exports = ({ issuesRouter }) => {
  const pool = new Pool(config);
  pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
  });

  issuesRouter.get('/issues', (ctx, next) => {
    (async () => {
      const client = await pool.connect();
      try {
        const res = await client.query('SELECT * FROM issues');
        console.log(res.rows);
        ctx.body = res.rows;
      } finally {
        client.release();
      }
    })().catch(e => console.log(e.stack));
  });
  issuesRouter.post('/issues', (ctx, next) => {
    // const newIssue = ctx.request.body;
    // newIssue.id = issues.length + 1;
    // newIssue.created = new Date();
    // if (!newIssue.status) newIssue.status = 'New';
    // issues.push(newIssue);
    ctx.body = 'issues';
  });
};
