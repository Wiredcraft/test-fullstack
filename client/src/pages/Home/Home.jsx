// Import External Dependencies
import { Fragment, useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Outlet,
} from 'react-router-dom';
import styles from './Home.scss';
import { Posts } from '../../components/Posts'
import { Nav } from '../../components/Nav';

export function Home(props) {

  return (
    <div className={styles.root}>
      <Nav />
      <Posts />
    </div>
  );
}
export default Home;
