const Joi = require('joi');
const Router = require('express-promise-router');
const db = require('../db');
const issuesRouter = new Router();

const calculateQuery = params => {
  console.log(params);
  const keys = Object.keys(params);
  const values = Object.values(params);
  let count = 0;
  if (keys.length === 0) count += 0;
  if (params['status']) count += 1;
  if (params['gt']) count += 2;
  if (params['lt']) count += 4;
  return count;
};

const generateQuery = count => {
  let query = 'SELECT * FROM issues';
  switch (count) {
    case 1:
      query += ' WHERE status = $1';
      break;
    case 2:
      query += ' WHERE effort > $1';
      break;
    case 3:
      query += ' WHERE status = $1 AND effort > $2';
      break;
    case 4:
      query += ' WHERE effort < $1';
      break;
    case 5:
      query += ' WHERE status = $1 AND effort < $2';
      break;
    case 6:
      query += ' WHERE effort > $1 AND effort < $2';
      break;
    case 7:
      query += ' WHERE status = $1 AND effort > $2 AND effort < $3';
      break;
    default:
      query += '';
      break;
  }
  return query;
};

issuesRouter.get('/api/v1/issues', async (req, res) => {
  try {
    const paramRequests = await calculateQuery(req.query);
    console.log(paramRequests);
    const text = await generateQuery(paramRequests);
    const values = Object.values(req.query);
    console.log(text);
    console.log(values);
    const results = await db.query(text, values);
    res.json(results.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Internal Server Error: ${err}` });
  }
});
issuesRouter.post('/api/v1/issues', async (req, res) => {
  const schema = {
    owner: Joi.string()
      .min(1)
      .max(255)
      .required(),
    title: Joi.string()
      .min(1)
      .max(512)
      .required()
  };
  const validateResult = Joi.validate(req.body, schema);
  const newIssue = req.body;

  if (validateResult.error) {
    res.status(400).send(validateResult.error.details[0].message);
    return;
  }

  newIssue.created = new Date();
  if (!newIssue.status) newIssue.status = 'New';
  if (!newIssue.effort) newIssue.effort = 5;
  if (!newIssue.completion_date) newIssue.completion_date = null;
  try {
    const results = await db.query(
      'INSERT INTO issues(status, owner, created, effort, completion_date, title) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [
        newIssue.status,
        newIssue.owner,
        newIssue.created,
        newIssue.effort,
        newIssue.completion_date,
        newIssue.title
      ]
    );
    res.json(results.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
});
issuesRouter.put('/api/v1/issues', (req, res) => {
  return res.send('Received a GET HTTP method');
});
issuesRouter.delete('/api/v1/issues', (req, res) => {
  return res.send('Received a GET HTTP method');
});

module.exports = issuesRouter;
