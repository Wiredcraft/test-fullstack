import { Link } from 'react-router-dom';
import styles from './Nav.scss';

export function Nav() {
  return (
    <div className={styles.root}>
      <Link to="/newest">newest</Link>
      &nbsp;|&nbsp;
      <Link to="/submit">submit</Link>
      &nbsp;|&nbsp;
      <Link to="/login">login</Link>
    </div>
  );
}

export default Nav;
