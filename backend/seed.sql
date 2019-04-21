DROP DATABASE IF EXISTS qc CASCADE;
CREATE USER IF NOT EXISTS leader;
CREATE DATABASE IF NOT EXISTS qc;
GRANT ALL ON DATABASE qc TO leader;

CREATE TABLE IF NOT EXISTS qc.partnumbers (
  id SERIAL PRIMARY KEY,
  partnumber STRING,
  chemistry STRING,
  createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS qc.lotnumbers (
  id SERIAL PRIMARY KEY,
  lotnumber STRING,
  partnumberid SERIAL NOT NULL REFERENCES qc.partnumbers (id),
  createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS qc.inventory (
  id SERIAL PRIMARY KEY,
  manufacture TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP, 
  expire TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP, 
  lotnumberid SERIAL NOT NULL REFERENCES qc.lotnumbers (id),
  createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO qc.partnumbers (partnumber, chemistry) VALUES 
  ('444444','APOA'),
  ('465971','IBCT'),
  ('444445','APOB');

INSERT INTO qc.lotnumbers (lotnumber, partnumberid) VALUES 
  ('M803076',(SELECT id FROM qc.partnumbers AS pn WHERE pn.partnumber = '444444')),
  ('M909090',(SELECT id FROM qc.partnumbers AS pn WHERE pn.partnumber = '465971')),
  ('M990991',(SELECT id FROM qc.partnumbers AS pn WHERE pn.partnumber = '444445'));

INSERT INTO qc.inventory (manufacture, expire, lotnumberid) VALUES
    ( '2016-03-21 10:10:10-05:00','2016-03-21 10:10:10-05:00', (SELECT id FROM qc.lotnumbers AS ln WHERE ln.lotnumber = 'M803076')),
    ( '2016-03-21 10:10:10-05:00','2016-03-21 10:10:10-05:00', (SELECT id FROM qc.lotnumbers AS ln WHERE ln.lotnumber = 'M909090')),
    ( '2016-03-21 10:10:10-05:00','2016-03-21 10:10:10-05:00', (SELECT id FROM qc.lotnumbers AS ln WHERE ln.lotnumber = 'M990991'));