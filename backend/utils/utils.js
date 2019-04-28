const calculateQuery = params => {
  const keys = Object.keys(params);
  let count = 0;
  if (keys.length === 0) count += 0;
  if (params['status']) count += 1;
  if (params['gt']) count += 2;
  if (params['lt']) count += 4;
  return count;
};

module.exports.calculateQuery = calculateQuery;

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

module.exports.generateQuery = generateQuery;
