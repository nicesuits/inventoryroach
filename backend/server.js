const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const pg = require('pg');
const config = {
  user: 'leader',
  host: 'localhost',
  database: 'issuetracker',
  port: 26257
};

const pool = new pg.Pool(config);
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/api/v1/issues', async (req, res) => {
  const client = await pool.connect();
  try {
    if (req.query.assigned !== undefined) {
      const results = await client.query(
        'SELECT * FROM issues WHERE status = $1',
        [req.query.assigned]
      );
      res.json(results.rows);
    } else {
      const results = await client.query('SELECT * FROM issues');
      res.json(results.rows);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  } finally {
    client.release();
  }
});
app.post('/api/v1/issues', async (req, res) => {
  const newIssue = req.body;
  newIssue.created = new Date();
  if (!newIssue.status) newIssue.status = 'New';
  if (!newIssue.effort) newIssue.effort = 5;
  if (!newIssue.completion_date) newIssue.completion_date = null;
  const client = await pool.connect();
  try {
    const results = await client.query(
      'INSERT INTO issues(status, owner, created, effort, completion_date, title) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, status, owner, created, effort, completion_date, title',
      [
        newIssue.status,
        newIssue.owner,
        newIssue.created,
        newIssue.effort,
        newIssue.completion_date,
        newIssue.title
      ]
    );
    return res.json(results.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Internal Server Error: ${error}` });
  } finally {
    client.release();
  }
});
app.put('/api/v1/issues', (req, res) => {
  return res.send('Received a GET HTTP method');
});
app.delete('/api/v1/issues', (req, res) => {
  return res.send('Received a GET HTTP method');
});

const server = app.listen(3000, () => {
  console.log(`Server running on localhost:3000`);
});
module.exports = server;
