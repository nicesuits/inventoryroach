const { Pool } = require('pg');
const config = {
  user: 'leader',
  host: 'localhost',
  database: 'issuetracker',
  port: 26257
};

module.exports = ({ issuesRouter }) => {
  const pool = new Pool(config);
  pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
  });

  issuesRouter.get('/issues', async (ctx, next) => {
    const client = await pool.connect();
    try {
      const res = await client.query('SELECT * FROM issues');
      ctx.body = res.rows;
    } catch (err) {
      console.log(err);
    } finally {
      client.release();
    }
  });
  issuesRouter.post('/issues', async (ctx, next) => {
    const newIssue = ctx.request.body;
    newIssue.created = new Date();
    if (!newIssue.status) newIssue.status = 'New';
    if (!newIssue.effort) newIssue.effort = 5;
    if (!newIssue.completionDate) newIssue.completionDate = null;
    const client = await pool.connect();
    try {
      const res = await client.query(
        'INSERT INTO issues(status, owner, created, effort, completion_date, title) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, status, owner, created, effort, completion_date, title',
        [
          newIssue.status,
          newIssue.owner,
          newIssue.created,
          newIssue.effort,
          newIssue.completionDate,
          newIssue.title
        ]
      );
      ctx.body = res.rows;
    } catch (err) {
      console.log(err);
    } finally {
      client.release();
    }
  });
};
