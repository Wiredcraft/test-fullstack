import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import React from 'react';

import { myAtom } from '@/store/auth';
import { PATH } from '@/const';

interface Props {
  children: React.ReactElement;
  required?: boolean;
  to?: string;
}

export function ProtectedRoute(props: Props): React.ReactElement {
  const { to = PATH.LOGIN, required, children } = props;

  const user = useRecoilValue(myAtom);

  if (required || user) return children;
  return <Navigate to={to} replace />;
}

/**
 * Hoc Version of ProtectedRoute
 * @param WrappedComponent
 * @returns
 */
export function protectedRoute<P>(WrappedComponent: React.ElementType) {
  return function ProtectedRouteComponent(
    props: P & Record<'$protected', Omit<Props, 'children'>>,
  ) {
    const { $protected, ...wrappedProps } = props;

    return (
      <ProtectedRoute {...$protected}>
        <WrappedComponent {...wrappedProps} />
      </ProtectedRoute>
    );
  };
}
