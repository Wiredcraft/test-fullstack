import React from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import DefaultLayout from '../layouts/default';
import FullPageLayout from '../layouts/full-page';
import Loading from '../pages/common/loading';
import HomeIndex from '../pages/home';

function lazyLoadView(groups: string[], view: string) {
  const V = React.lazy(() => import(`../pages/${groups.join('/')}/${view}`));
  return (
    <React.Suspense fallback={<Loading />}>
      <V />
    </React.Suspense>
  );
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { index: true, element: lazyLoadView(['home'], 'index') },
      {
        path: '/auth',
        element: <Outlet />,
        children: [{ index: true, element: lazyLoadView(['auth'], 'index') }]
      },
      { path: '*', element: lazyLoadView(['errors'], '404') }
    ]
  }
];

export default routes;
