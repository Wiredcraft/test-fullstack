import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TalkListPage from './pages/TalkListPage';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/header/Header';
import { TalksProvider } from './contexts/TalksContext';

ReactDOM.render(
  <AuthProvider>
    <TalksProvider>
      <Header />
      <React.StrictMode>
        <TalkListPage />
      </React.StrictMode>
    </TalksProvider>
  </AuthProvider>
  ,
  document.getElementById('root')
);
