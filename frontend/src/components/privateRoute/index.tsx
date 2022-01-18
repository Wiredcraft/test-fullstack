import React, {ReactElement} from 'react';
import {Navigate} from 'react-router-dom';
import {checkCookie} from '../../utils/cookies';

interface Props {
  children: React.ReactNode;
}

/**
  * Redirect user to a specified children if the user is authenticated.
  * If the user is not authenticated, redirect to /login.
  * @param {Props} props
  * @param {ReactElement} props.children - Children to display
  * @return {ReactElement}
 */
function PrivateRoute(props: Props): ReactElement {
  return (
    <React.Fragment>
      {checkCookie() ? props.children : <Navigate to="/login" />}
    </React.Fragment>);
}

export default PrivateRoute;
