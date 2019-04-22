import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import IssueList from './components/IssueList';
import IssueEdit from './components/IssueEdit';
import IssueNotFound from './components/IssueNotFound';

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/issues" component={IssueList} />
        <Route exact path="/issues/:id" component={IssueEdit} />
        <Redirect from="/" to="/issues" />
        <Route path="*" component={IssueNotFound} />
      </Switch>
    </BrowserRouter>
  );
};
