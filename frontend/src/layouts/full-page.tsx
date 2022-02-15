import React from 'react';
import { Outlet } from 'react-router-dom';

export default class FullPageLayout extends React.Component {
  render() {
    return (
      <div className="page-container">
        <div className="max-w">
          <Outlet />
        </div>
      </div>
    );
  }
}
