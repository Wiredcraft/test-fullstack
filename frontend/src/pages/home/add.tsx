import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddForm from '../../components/ui/AddForm';
import { toast } from '../../components/ui/ToastManager';
import { useAppSelector } from '../../store';
import Loading from '../common/loading';

export default function HomeAdd() {
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loggedIn) {
      navigate('/auth', { replace: true });
      toast.show({
        title: 'Login Required',
        content: 'You must login before adding a new talk.',
        type: 'error',
        duration: 3000
      });
    } else {
      setLoading(false);
    }
  }, []);

  let element;

  if (loading) {
    element = <Loading />;
  } else {
    element = (
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-3xl">Add a New Talk</h1>
        <AddForm />
      </div>
    );
  }

  return <div>{element}</div>;
}
