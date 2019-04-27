const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const issuesRouter = require('./routes/issues');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(issuesRouter);

const server = app.listen(3000, () => {
  console.log(`Server running on localhost:3000`);
});
module.exports = server;
