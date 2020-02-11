import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import { useAuth0 } from '../../index.provider';

export default function UserInfo(props: {token: string}) {
    const {logout, user, isLogin} = useAuth0();

    function onLoginOut() {
      logout();
    }

    return (
      <div className="mod-user-info" data-testid="userInfo">
        {
          isLogin ? [
            <h4 key="wellcome">wellcome {user && user.userName}</h4>,
            <a key="loginStatus" onClick={onLoginOut}>login out</a>
          ] :  <Link to="/login">please login</Link>
            
        }
      </div>
    )
  }