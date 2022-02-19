import React from 'react';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from '../../components/ui/ToastManager';
import { useAppDispatch, useAppSelector } from '../../store';
import { login } from '../../store/modules/user/user.api';
import Loading from '../common/loading';

export default () => {
  const dispatch = useAppDispatch();
  const loginStatus = useAppSelector((state) => state.user.status);

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
    }
  }, []);

  useEffect(() => {
    if (loginStatus === 'succeeded') {
      navigate('/', { state: 'success' });
      toast.show({
        title: 'Login Successful!',
        content: 'You may now vote and create your own talks.',
        type: 'success',
        duration: 3000
      });
    } else if (loginStatus === 'failed') {
      navigate('/', { state: 'error' });
      toast.show({
        title: 'There was an error logging in.',
        content: 'Please try again later.',
        type: 'error',
        duration: 3000
      });
    }
  }, [loginStatus]);

  return <Loading />;
};
