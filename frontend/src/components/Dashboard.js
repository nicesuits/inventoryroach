import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <p>This is the Dashboard Page.</p>
      <Link to="/issues">Issue Tracker</Link>
    </div>
  );
};

export default Dashboard;
