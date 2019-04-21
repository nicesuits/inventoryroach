import React from 'react';
import { Link } from 'react-router-dom';

const IssueFilter = () => {
  const Seperator = () => <span> | </span>;
  return (
    <div>
      <Link to="/issues">All Issues</Link>
      <Seperator />
      <Link to={{ pathname: '/issues', query: { status: 'Open' } }}>
        Open Issues
      </Link>
      <Seperator />
      <Link to={{ pathname: '/issues', query: { status: 'Assigned' } }}>
        Assigned Issues
      </Link>
    </div>
  );
};

export default IssueFilter;
