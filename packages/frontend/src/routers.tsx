import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import NotFound from '@pages/fault/not-found';
import Login from '@pages/login';
import Index from '@pages/index';
import Talk from '@pages/talk';
import NewTalk from '@pages/newTalk';

const routers = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/:id',
    element: <Talk />,
  },
  {
    path: '/new',
    element: <NewTalk />,
  },
  {
    path: '/talks',
    element: <Index />,
  },
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routers;
