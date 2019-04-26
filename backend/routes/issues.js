const Joi = require('joi');
const issuesRouter = require('express').Router();
const db = require('../db');

issuesRouter.get('/api/v1/issues', async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM issues');
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
  const client = await db.query();
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
issuesRouter.put('/api/v1/issues', (req, res) => {
  return res.send('Received a GET HTTP method');
});
issuesRouter.delete('/api/v1/issues', (req, res) => {
  return res.send('Received a GET HTTP method');
});

module.exports = issuesRouter;
