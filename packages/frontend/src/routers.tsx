import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '@pages/fault/not-found';
import Login from '@pages/login';
import Index from '@pages/index';

function AppRouters() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Index />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouters;
