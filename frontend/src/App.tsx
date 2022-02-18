import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './router';
import { useAppDispatch } from './store';
import { fetchMe } from './store/modules/user/user.api';


const App = () => {
  const dispatch = useAppDispatch()

  if (localStorage.getItem('fs_auth') === 'true') {
    useEffect(() => {
      dispatch(fetchMe())
    }, [ dispatch ]);
  }

  const router = useRoutes(routes);

  return <div>{router}</div>;
};
export default App;
