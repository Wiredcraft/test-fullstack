import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';

export default class DefaultLayout extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="max-w">
          <Outlet />
        </div>
      </div>
    );
  }
}
