import React, { useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { Link, useHistory } from 'react-router-dom';
import './index.scss';

export default function UserInfo(props: {token: string}) {
    const [userName, setUserName] = useState();

    async function getUser(token: string) {
      const res = await fetch('http://localhost:3000/auth/user', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      setUserName(data.userName);
    };

    function loginOut() {
      setUserName('');
      sessionStorage.removeItem('token');
    }

    useEffect(() => {
      if(props.token){
        getUser(props.token);
      }
      
    }, [props.token])

    return (
      <div className="mod-user-info">
        {
            userName ? [
              <h4 key="wellcome">wellcome {userName}</h4>,
              <a key="loginStatus" onClick={loginOut}>login out</a>
            ] :  <Link to="/login">please login</Link>
            
        }
      </div>
    )
  }