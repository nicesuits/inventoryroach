const { Pool } = require('pg');

const config = {
  user: 'leader',
  host: 'localhost',
  database: 'issuetracker',
  port: 26257
};

const pool = new Pool(config);

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};
