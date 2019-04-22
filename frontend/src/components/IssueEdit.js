import React from 'react';
import { Link } from 'react-router-dom';

const IssueEdit = props => {
  return (
    <div>
      <p>This is a placeholder for editing issue {props.match.params.id}.</p>
      <Link to="/issues">Back to issue list</Link>
    </div>
  );
};

export default IssueEdit;
