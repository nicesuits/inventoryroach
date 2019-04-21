DROP DATABASE IF EXISTS issuetracker CASCADE;
CREATE USER IF NOT EXISTS leader;
CREATE DATABASE IF NOT EXISTS issuetracker;
GRANT ALL ON DATABASE issuetracker TO leader;

CREATE TABLE IF NOT EXISTS issuetracker.issues (
  id SERIAL PRIMARY KEY,
  status STRING DEFAULT NULL,
  owner STRING DEFAULT NULL,
  created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  effort INT DEFAULT NULL,
  completion_date TIMESTAMPTZ DEFAULT NULL,
  title STRING DEFAULT NULL
);

INSERT INTO issuetracker.issues (status, owner, created, effort, completion_date, title) VALUES 
  ('Open', 'Ravan', '2016-08-15', 5, NULL, 'Error in console when clicking Add'),
  ('Assigned', 'Eddie', '2016-08-16', 15, '2016-08-30', 'Missing bottom border on panel');
