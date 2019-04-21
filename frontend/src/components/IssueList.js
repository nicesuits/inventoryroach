import React, { Component } from 'react';

import IssueAdd from './IssueAdd';
import IssueFilter from './IssueFilter';
import IssueTable from './IssueTable';

class IssueList extends Component {
  constructor() {
    super();
    this.state = { issues: [] };
    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const oldQuery = new URLSearchParams(prevProps.location.search);
    const newQuery = new URLSearchParams(this.props.location.search);
    if (oldQuery === newQuery) {
      return;
    }
    this.loadData();
  }

  createIssue(newIssue) {
    fetch('http://localhost:3001/api/v1/issues', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newIssue)
    })
      .then(res => res.json())
      .then(updatedIssue => {
        updatedIssue.created = new Date(updatedIssue.created);
        if (updatedIssue.completion_date)
          updatedIssue.completion_date = new Date(updatedIssue.completion_date);
        const newIssues = this.state.issues.concat(updatedIssue);
        this.setState({ issues: newIssues });
      })
      .catch(err =>
        console.log(`Error in sending data to server: ${err.message}`)
      );
  }

  loadData() {
    // console.log(this.props.location);
    // const query = new URLSearchParams(this.props.location.search);
    // let url = 'http://localhost:3001/api/v1/issues';
    // switch (search) {
    //   case '':
    //     url = `http://localhost:3001/api/v1/issues`;
    //     break;
    //   default:
    //     url = `http://localhost:3001/api/v1/issues${query}`;
    //     break;
    // }

    fetch(
      `http://localhost:3001/api/v1/issues?${this.props.location.query}`
    ).then(res => {
      if (res.ok) {
        res.json().then(data => {
          data.forEach(issue => {
            issue.created = new Date(issue.created);
            if (issue.completion_date) {
              issue.completion_date = new Date(issue.completion_date);
            }
          });
          this.setState({ issues: data });
        });
      } else {
        res
          .json()
          .then(err => console.error(`Failed to fetch issues ${err.message}`));
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable issues={this.state.issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
      </div>
    );
  }
}

export default IssueList;
