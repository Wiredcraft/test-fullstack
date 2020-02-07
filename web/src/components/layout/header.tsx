import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserInfo from '../userInfo'
import './index.scss';

export default function Header({}) {
  let history = useHistory();
  const [token, setToken] = useState();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if(token){
      setToken(token);
    }
    
  }, [])

  function gotoHome() {
    console.log('gotoHome')
    history.push('/')
  }

  return (
    <div className="mod-top" data-testid="header">
      <h1 className="logo" data-testid="logo" onClick={gotoHome}>lightning talk</h1>
      <UserInfo token={token}></UserInfo>
    </div>
  )
}