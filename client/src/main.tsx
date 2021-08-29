import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import TalkListPage from './pages/TalkListPage'
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/header/Header';

ReactDOM.render(
  <AuthProvider>
    <Header />
    <React.StrictMode>
      <TalkListPage />
    </React.StrictMode>
  </AuthProvider>
  ,
  document.getElementById('root')
)
