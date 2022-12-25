import { Suspense } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { Login } from './Login';
import { NotFound } from './NotFound';
import { TalkSubmit } from './TalkSubmit';
import { TalksList } from './TalksList';

import { PATH } from '@/const';
import { BaseLayout } from '@/layouts/BaseLayout';
import { MainLayout } from '@/layouts/MainLayout';
import '@/theme/reset.css';
import '@/utils/dayjs';
import 'normalize.css';

const router = createBrowserRouter([
  {
    path: PATH.LOGIN,
    element: (
      <BaseLayout>
        <Login />
      </BaseLayout>
    ),
  },
  {
    path: PATH.HOME,
    element: <MainLayout route />,
    children: [
      { index: true, element: <Navigate to={PATH.TALKS} replace /> },
      { path: `${PATH.TALKS}`, element: <TalksList /> },
      { path: `${PATH.TALKS_SUBMIT}`, element: <TalkSubmit /> },
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
