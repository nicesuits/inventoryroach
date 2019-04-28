import React from 'react';
import { Link } from 'react-router-dom';

const IssueNotFound = () => {
  return (
    <div>
      <p>Page Not Found</p>
      <Link to="/">Back to Home Page</Link>
    </div>
  );
};

export default IssueNotFound;
