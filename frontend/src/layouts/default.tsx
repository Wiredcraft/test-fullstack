import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';

export default function DefaultLayout() {
  return (
    <div className="relative">
      <Navbar />
      <div className="spacer mb-12">&nsbp;</div>
      <div className="max-w pt-12">
        <Outlet />
      </div>
    </div>
  );
}
