import React, { FC, useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import UserContext from "../../../contexts/user";
import * as ROUTES from "../../../constants/routes";

const PrivateRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { user } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: ROUTES.LOGIN,
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
