import { Suspense } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { Login } from './Login';
import { NotFound } from './NotFound';
import { Talks } from './Talks';

import { PATH } from '@/const';
import { MainLayout } from '@/layouts/MainLayout';

import '@/theme/reset.css';
import '@/utils/dayjs';
import 'normalize.css';

const router = createBrowserRouter([
  {
    path: PATH.LOGIN,
    element: <Login />,
  },
  {
    path: PATH.HOME,
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to={PATH.TALKS} replace /> },
      {
        path: PATH.TALKS,
        element: <Talks />,
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={null}>
        <RouterProvider router={router} />
      </Suspense>
    </RecoilRoot>
  );
}
