import React from 'react';

import IssueAdd from './IssueAdd';
import IssueFilter from './IssueFilter';
import IssueTable from './IssueTable';

const IssueList = () => {
  return (
    <div>
      <h1>Issue Tracker</h1>
      <IssueFilter />
      <hr />
      <IssueTable />
      <hr />
      <IssueAdd />
    </div>
  );
};

export default IssueList;
