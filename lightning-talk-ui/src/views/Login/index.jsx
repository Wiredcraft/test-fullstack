import React, { useState } from 'react';

import RegisterForm from '@/components/RegisterForm';
import LoginForm from '@/components/LoginForm';

const Login = () => {
  const [login, setLogin] = useState(true);
  return (
    <div className="login-wrapper">
      {login ? <LoginForm /> : <RegisterForm />}
      <button type="button" onClick={() => setLogin(!login)} className="btn--text">
        {login ? 'create an account' : 'already got an account? login'}
      </button>
    </div>
  );
};

export default Login;
