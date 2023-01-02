import { signin } from '@redux/actions';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [name, setName] = useState();
  const [password, setPassword] = useState();

  const handleNameChange = useCallback((e: any) => {
    setName(e.target.value);
  }, []);
  const handlePasswordChange = useCallback((e: any) => {
    setPassword(e.target.value);
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const handleSubmit = useCallback(() => {
    const payload = { name, password };
    dispatch(signin(payload))
      .then(() => navigate('/'))
      .catch(() => {
        throw new Error('adding talk has error.');
      });
  }, [dispatch, navigate, password, name]);

  return (
    <form>
      <div>
        <label htmlFor="name" style={{ display: 'flex', width: 300, margin: 12 }}>
          <span style={{ width: 100 }}>name:</span>
          <input name="name" type="text" style={{ width: 200 }} onChange={handleNameChange} />
        </label>
      </div>
      <div>
        <label htmlFor="password" style={{ display: 'flex', width: 300, margin: 12 }}>
          <span style={{ width: 100 }}>password:</span>
          <input name="password" type="password" style={{ width: 200 }} onChange={handlePasswordChange} />
        </label>
      </div>
      <div>
        <button onClick={handleSubmit} type="button" style={{ margin: 12 }}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default Login;
