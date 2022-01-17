import { Fragment, useEffect, useState } from 'react';
import {
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import PageNotFound from './components/PageNotFound/PageNotFound';
import { Submit } from './pages/Submit';
import { Home } from './pages/Home';
import { Newest } from './pages/Newest';
import { Login } from './pages/Login';
import styles from './App.scss';

function App(props) {

  return (
    <div className={styles.root}>
      <Routes>
        <Route
          element={
            <Outlet />
          }
        >
          <Route path="" element={<Home />} />
          <Route path="newest" element={<Newest />} />
          <Route path="submit" element={<Submit />} />
          {/* TODO 将login抽取出来，样式跟其他的不一样 */}
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
