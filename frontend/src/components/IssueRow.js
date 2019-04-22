import React from 'react';
import { Link } from 'react-router-dom';

const IssueRow = props => {
  return (
    <tr>
      <td>
        <Link to={`/issues/${props.issue.id}`}>
          {props.issue.id.substring(10)}
        </Link>
      </td>
      <td>{props.issue.status}</td>
      <td>{props.issue.owner}</td>
      <td>{props.issue.created.toDateString()}</td>
      <td>{props.issue.effort}</td>
      <td>
        {props.issue.completion_date
          ? props.issue.completion_date.toDateString()
          : ''}
      </td>
      <td>{props.issue.title}</td>
    </tr>
  );
};

export default IssueRow;
