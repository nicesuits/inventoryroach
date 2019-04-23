import React from 'react';
import { Link } from 'react-router-dom';

const IssueFilter = () => {
  const Seperator = () => <span> | </span>;
  return (
    <div>
      <Link to="/issues">All Issues</Link>
      <Seperator />
      <Link to="/issues?status=Open">Open Issues</Link>
      <Seperator />
      <Link to="/issues?status=Assigned">Assigned Issues</Link>
      <Seperator />
      <Link to="/issues?status=New">New Issues</Link>
    </div>
  );
};

export default IssueFilter;
