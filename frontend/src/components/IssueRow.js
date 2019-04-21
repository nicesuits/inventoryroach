import React from 'react';

const IssueRow = props => {
  return (
    <tr>
      <td>{props.issue.id.substring(10)}</td>
      <td>{props.issue.status}</td>
      <td>{props.issue.owner}</td>
      <td>{props.issue.created.toDateString()}</td>
      <td>{props.issue.effort}</td>
      <td>
        {props.issue.completion_date
          ? new Date(props.issue.completion_date).toDateString()
          : ''}
      </td>
      <td>{props.issue.title}</td>
    </tr>
  );
};

export default IssueRow;
