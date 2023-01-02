import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TalksList from '@components/talksList';
import { getTalksData } from '@redux/actions';
import { useNavigate } from 'react-router-dom';

function Index() {
  const { data } = useSelector((store: any) => store.talks);
  const { token } = useSelector((store: any) => store.user);
  const navigate = useNavigate();
  const handleNewClick = useCallback(() => {
    if (!token) {
      alert('Please Login!');
    } else {
      navigate('/new');
    }
  }, [navigate, token]);

  const handleLoginClick = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getTalksData());
  }, [dispatch]);

  return (
    <div className="App">
      <div style={{ width: 200, display: 'flex', justifyContent: 'space-between' }}>
        <button type="button" className="bg-btn" onClick={handleNewClick}>
          New Talk
        </button>
        {!token && (
          <button type="button" className="bg-btn" onClick={handleLoginClick}>
            Login
          </button>
        )}
      </div>
      <TalksList data={data} />
    </div>
  );
}

export default Index;
