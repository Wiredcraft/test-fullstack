import React, { useState } from 'react';
import { LoginRequest } from '../../models';
import { localStorageService } from '../../services';
import { loginStore, uiStore } from '../../stores';
import { StringUtils } from '../../utils';
import './index.scss';

type Props = {
  onSuccess?: () => void;
};

const LoginView: React.FC<Props> = (props) => {
  const [loginID, setLoginID] = useState('fullstack');
  const [password, setPassword] = useState('123456');

  const onLogin = () => {
    const request = {
      loginID: loginID,
      password: password,
    } as LoginRequest;
    loginStore.doLogin(request).then(() => {
      if (!StringUtils.isBlank(localStorageService.authToken)) {
        uiStore.setHasLogined(true);
      }
      props.onSuccess?.call(this);
    });
  };

  return (
    <div className="login-view">
      <div>
        <label className="required">User ID</label>
        <input type="text" value={loginID} onInput={(e: any) => setLoginID(e.target.value)} placeholder="fullstack" />
      </div>
      <div style={{ marginTop: '6px' }}>
        <label className="required">Password</label>
        <input type="password" value={password} onInput={(e: any) => setPassword(e.target.value)} />
      </div>
      <div className="login-view__footer">
        <button onClick={onLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginView;
