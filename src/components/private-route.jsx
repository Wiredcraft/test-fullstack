import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Store } from '../store/store-provider';

export const PrivateRoute = ({ children, ...props }) => {
  const { state } = React.useContext(Store);
  const isAuthenticated = !!state.userInfo.username;

  return (
    <Route {...props}>
      {isAuthenticated ? (
        children
      ) : (
        <Redirect
          to={{ pathname: '/sign-in', state: { from: props.location } }}
        />
      )}
    </Route>
  );
};
