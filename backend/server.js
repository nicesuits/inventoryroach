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
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.effort_lte) filter.effort_lte = req.query.effort_lte;
    if (req.query.effort_gte) filter.effort_gte = req.query.effort_gte;
    if (req.query.effort_lte)
      filter.effort_lte = parseInt(req.query.effort_lte, 10);
    if (req.query.effort_gte)
      filter.effort_gte = parseInt(req.query.effort_gte, 10);

    let query = '';
    if (filter.status === undefined) {
      query = 'SELECT * FROM issues';
    } else {
      query = 'SELECT * FROM issues WHERE status = $1';
    }
    if (filter.effort_lte || filter.effort_gte) {
      if (filter.effort_lte && filter.effort_gte === undefined) {
        query += ' AND effort < $2';
      } else if (filter.effort_lte === undefined && filter.effort_gte) {
        query += ' AND effort > $2';
      } else {
        query += ' AND effort < $2 AND effort > $3';
      }
    }
    const params = Object.values(filter);
    const results = await client.query(query, params);
    res.json(results.rows);
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
