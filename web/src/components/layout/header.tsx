import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
    <div className="mod-top">
      <h1 className="logo" onClick={gotoHome}>lightning talk</h1>
      <UserInfo token={token}></UserInfo>
    </div>
  )
}