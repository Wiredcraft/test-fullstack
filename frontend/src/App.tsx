import React, { useEffect, useState } from 'react';
import LightingTalkList from './components/LightingTalkList';
import LoginView from './views/LoginView';
import Modal from './components/Modal';
import { setApiErrorHandler } from './services';
import './App.scss';
import { AxiosError } from 'axios';
import { observer } from 'mobx-react-lite';
import { uiStore } from './stores';

const App: React.FC = observer(() => {
  const [showLogin, setShowLogin] = useState(false);
  const [apiError, setApiError] = useState('');
  // Has logined
  useEffect(() => {
    const errorHandler = (e: AxiosError) => {
      const respError = e.response?.data?.error;
      if (e?.response?.status == 401) {
        setShowLogin(true);
      }

      if (respError) {
        if (respError.statusCode === 401 || respError.statusCode === 403) {
          setShowLogin(true);
        } else {
          setApiError(e.response?.data?.reason || 'API Error');
        }
      }
    };
    setApiErrorHandler(errorHandler);
  }, []);

  return (
    <div>
      {apiError && <div className="alert">{apiError}</div>}

      {!uiStore.hasLogined && (
        <a className="login-btn" onClick={() => setShowLogin(true)}>
          Login
        </a>
      )}
      {/* Talk list */}
      <LightingTalkList />
      {/* Login modal */}
      <Modal visable={showLogin} title="Login">
        <LoginView onSuccess={() => setShowLogin(false)} />
      </Modal>
    </div>
  );
});
export default App;
