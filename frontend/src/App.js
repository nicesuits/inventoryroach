import React from 'react';
import { Router, Route, BrowserRouter } from 'react-router-dom';

import IssueList from './components/IssueList';
import IssueEdit from './components/IssueEdit';
import IssueNotFound from './components/IssueNotFound';

export default () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={IssueList} />
      <Route exact path="/issueEdit" component={IssueEdit} />
      <Route path="*" component={IssueNotFound} />
    </BrowserRouter>
  );
};
