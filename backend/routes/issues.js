const Joi = require('joi');
const Router = require('express-promise-router');
const db = require('../db');
const utils = require('../utils/utils');
const issuesRouter = new Router();

issuesRouter.get('/api/v1/issues', async (req, res) => {
  try {
    const paramRequests = await utils.calculateQuery(req.query);
    const text = await utils.generateQuery(paramRequests);
    const values = Object.values(req.query);
    const results = await db.query(text, values);
    res.json(results.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Internal Server Error: ${err}` });
  }
});
issuesRouter.post('/api/v1/issues', async (req, res) => {
  const schema = {
    owner: Joi.string(),
    title: Joi.string(),
    status: Joi.string(),
    effort: Joi.number(),
    created: Joi.date(),
    completion_date: Joi.date()
  };
  const validateResult = Joi.validate(req.body, schema);
  const newIssue = req.body;

  if (validateResult.error) {
    res.status(400).send(validateResult.error.details[0].message);
    return;
  }

  if (!newIssue.created) newIssue.created = new Date();
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
