import React from 'react';
import { Link } from 'react-router-dom';

const IssueNotFound = () => {
  return (
    <div>
      <p>Page Not Found</p>
      <Link to="/issues">Back to issue list</Link>
    </div>
  );
};

export default IssueNotFound;
