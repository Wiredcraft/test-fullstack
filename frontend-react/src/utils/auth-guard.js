import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../contexts/user';

function AuthGuard(Component) {
  return (props) => {
    // eslint-disable-next-line
    const [currentUser,] = useContext(UserContext);

    if (currentUser) {
      return <Component {...props} />;
    } else {
      return <Redirect to={`/login?returnUrl=${encodeURIComponent(props.location.pathname + props.location.search)}`} />;
    }
  };
}

export default AuthGuard;
