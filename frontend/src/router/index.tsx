import React from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

import DefaultLayout from '../layouts/default';
import Loading from '../pages/common/loading';

function lazyLoadView(groups: string[], view: string) {
  const V = React.lazy(() => import(`../pages/${groups.join('/')}/${view}`));
  return (
    <React.Suspense fallback={<Loading />}>
      <V />
    </React.Suspense>
  );
}

const routes = (loggedIn: boolean): RouteObject[] => [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { index: true, element: lazyLoadView(['home'], 'index') },
      {
        path: '/add',
        element: lazyLoadView(['home'], 'add')
      },
      {
        path: '/auth',
        element: <Outlet />,
        children: [
          { index: true, element: lazyLoadView(['auth'], 'index') },
          { path: '/auth/github', element: lazyLoadView(['auth'], 'github') }
        ]
      },
      { path: '*', element: lazyLoadView(['errors'], '404') }
    ]
  }
];

export default routes;
