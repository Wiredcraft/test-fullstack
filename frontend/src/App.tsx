import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './router';
import { useAppDispatch, useAppSelector } from './store';
import { fetchMe } from './store/modules/user/user.api';

const App = () => {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector((state) => state.user.loggedIn)
  const router = useRoutes(routes(loggedIn));

  useEffect(() => {
    if (localStorage.getItem('fs_auth') === 'true') {
      dispatch(fetchMe());
    }
  }, []);


  return <div>{router}</div>;
};
export default App;
