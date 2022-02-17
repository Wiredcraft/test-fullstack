import React from 'react';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { login } from '../../store/modules/user/user.api';

export default () => {
  const dispatch = useAppDispatch();
  const loginStatus = useAppSelector(state => state.user.status)

  let navigate = useNavigate();
  let [searchParams] = useSearchParams();

  const githubCode = searchParams.get('code');

  

  if (!githubCode) {
    useEffect(() => {
      navigate('/', { state: 'error' });
    });
  }

  useEffect(() => {
    if (loginStatus === 'idle' && githubCode) {
      dispatch(login({ provider: 'github', code: githubCode }));
      navigate('/', { state: 'success' });
    }
  }, [loginStatus, dispatch])

  let content;

  if (loginStatus === 'loading') {
    content = <span className='text-2xl text-bold'>LOADING...</span>
  } else if (loginStatus === 'succeeded') {
    navigate('/', { state: 'success' });
  } else {
    navigate('/', { state: 'error' });
  }

  return <div>{content}</div>;
};
