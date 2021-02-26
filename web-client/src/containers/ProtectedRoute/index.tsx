import PropTypes from 'prop-types';
import { memo } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useMobxStates } from 'store/mst/root-state-context';

function ProtectedRoute({ children, path, ...rest }: RouteProps) {
  const { authState } = useMobxStates()
  const isAuthenticated = authState?.isAuthenticated
  return (
    <Route
      path={path}
      {...rest}
      render={() =>
        isAuthenticated ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: '/auth/login',
              }}
            />
          )
      }
    />
  )
}

ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
};

export default memo(ProtectedRoute);
