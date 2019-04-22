import React from 'react';
import { Link } from 'react-router-dom';

const IssueFilter = () => {
  const Seperator = () => <span> | </span>;
  return (
    <div>
      <Link to="/issues">All Issues</Link>
      <Seperator />
      <Link to="/issues?assigned=Open">Open Issues</Link>
      <Seperator />
      <Link to="/issues?assigned=Assigned">Assigned Issues</Link>
      <Seperator />
      <Link to="/issues?assigned=New">New Issues</Link>
    </div>
  );
};

export default IssueFilter;
