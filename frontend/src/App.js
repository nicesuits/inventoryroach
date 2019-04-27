import React from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import IssueList from './components/IssueList';
import IssueEdit from './components/IssueEdit';
import IssueNotFound from './components/IssueNotFound';

export default () => {
  return (
    <BrowserRouter>
      <h1>Issue Tracker</h1>

      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/issues" component={withRouter(IssueList)} />
        <Route exact path="/issues/:id" component={IssueEdit} />
        <Route path="*" component={IssueNotFound} />
      </Switch>
    </BrowserRouter>
  );
};
