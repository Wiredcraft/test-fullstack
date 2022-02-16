import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';

export default class DefaultLayout extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className='spacer mb-12'>&nsbp;</div>
        <div className="max-w py-10">
          <Outlet />
        </div>
      </div>
    );
  }
}
